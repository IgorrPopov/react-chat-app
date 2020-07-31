const express = require('express');
const socketioConnectionLogic = require('./socketio/socketio');
const { checkNewUser, addUser } = require('./utils/users');

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

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
