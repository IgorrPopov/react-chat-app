const express = require('express');
const path = require('path');
const socketioConnectionLogic = require('./socketio/socketio');
const { checkNewUser, addUser } = require('./utils/users');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// ------------------ in build mode
const publicPath = path.join(__dirname, '..', 'public', 'build');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
// ------------------- in build mode

app.post('/login', (req, res) => {
  const checkedUser = checkNewUser(req.body);

  if (!checkedUser.errors) {
    const validUser = addUser(checkedUser.user);
    res.status(201).json(validUser);
  } else {
    res.status(400).json(checkedUser.errors);
  }
});

const server = app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

socketioConnectionLogic(server);
