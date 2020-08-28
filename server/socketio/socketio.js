const socketio = require('socket.io');
const {
  checkNewUser,
  addUser,
  removeUser,
  isUserExists,
  addUserSocketId,
  getAllUsersWithSockets,
  findUserBySocketId,
  findUserById,
  users,
} = require('../utils/users');

const MESSAGE_LENGTH = 500;

const socketioConnectionLogic = (server) => {
  const io = socketio(server);
  // connection
  io.on('connection', (socket) => {
    socket.on('join', (user) => {
      const { id: user_id } = user;

      if (isUserExists(user_id)) {
        const newUser = addUserSocketId(user_id, socket.id);
        delete newUser.errors;
        socket.broadcast.emit('new_user_connected', newUser);
      } else {
        const checkedReconnectedUser = checkNewUser(user);

        if (!checkedReconnectedUser.errors) {
          const reconnectedUser = checkedReconnectedUser.user;
          reconnectedUser.id = user_id;
          addUser(reconnectedUser);
          socket.broadcast.emit('new_user_connected', reconnectedUser);
        } else {
          socket.emit('logout');
        }
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
      const disconnectedUser = findUserBySocketId(socket.id);

      addUserSocketId(disconnectedUser.id, false);
      // check if the user reconnected after 60 seconds
      setTimeout(() => {
        const user = findUserById(disconnectedUser.id);

        if (user && !user.socket_id) {
          removeUser(user.id);
          socket.broadcast.emit('user_disconnected', user.id);
        }
      }, 60000);
    });
  });
};

module.exports = socketioConnectionLogic;
