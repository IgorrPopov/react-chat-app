const socketio = require('socket.io');
const {
  removeUser,
  isUserExists,
  addUserSocketId,
  getAllUsersWithSockets,
  findUserBySocketId,
  findUserById,
} = require('../utils/users');

const MESSAGE_LENGTH = 500;

const socketioConnectionLogic = (server) => {
  const io = socketio(server);
  // connection
  io.on('connection', (socket) => {
    console.log('New websocket connection ' + socket.id);

    socket.on('join', (user_id) => {
      if (isUserExists(user_id)) {
        const newUser = addUserSocketId(user_id, socket.id);
        socket.broadcast.emit('new_user_connected', newUser);
      }
    });

    socket.on('load_connected_users', (user_id) => {
      if (isUserExists(user_id)) {
        const allUsersWithSockets = getAllUsersWithSockets();

        if (allUsersWithSockets.length) {
          socket.emit(
            'load_connected_users',
            allUsersWithSockets.filter((user) => user.socket_id !== socket.id)
          );
        }
      }
    });

    socket.on('message', ({ text, user_id, companion_id } = {}) => {
      const user = findUserBySocketId(socket.id);
      const companion = findUserById(companion_id);

      if (user.id !== user_id) {
        return;
      }
      if (companion.socket_id === undefined) {
        return;
      }
      if (!text.length > 0) {
        return;
      }
      if (text.length > MESSAGE_LENGTH) {
        return;
      }

      socket.broadcast.to(companion.socket_id).emit('message', {
        companion_id: user_id,
        text,
      });
    });

    socket.on('disconnect', () => {
      const user = findUserBySocketId(socket.id);
      if (user) {
        removeUser(user.id);
        socket.broadcast.emit('user_disconnected', user.id);
      }
    });
  });
};

module.exports = socketioConnectionLogic;
