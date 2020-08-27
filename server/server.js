require('dotenv').config();
const express = require('express');
const path = require('path');
const socketioConnectionLogic = require('./socketio/socketio');
const { checkNewUser, addUser, isUserExists } = require('./utils/users');
const publicPath = path.join(
  __dirname,
  '..',
  'public',
  `${process.env.NODE_ENV === 'development' ? 'public' : 'build'}`
);

const app = express();
app.use(express.json());

app.use(express.static(publicPath));

const port = process.env.PORT || 5000;

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// app.post('/check-user', (req, res) => {
//   const user = req.body;

//   if (!isUserExists(user.id)) {
//     res.status(401).send();
//   }

//   res.send();
// });

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
