const { v4: uuidv4 } = require('uuid');

const avatarsList = require('./avatars-list');
const countriesList = require('./countries-list');

const users = [];

const addUser = (newUser) => {
  if (newUser.id === undefined) {
    newUser.id = uuidv4();
    users.push(newUser);
  } else {
    const index = users.findIndex((user) => user.id === newUser.id);

    if (index !== -1) {
      users[index] = newUser;
    } else {
      users.push(newUser);
    }
  }

  return newUser;
};

const isUserExists = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return index !== -1 ? users[index] : false;
};

const addUserSocketId = (user_id, socket_id) => {
  const index = users.findIndex((user) => user.id === user_id);

  if (index !== -1) {
    users[index].socket_id = socket_id;
    return users[index];
  }

  return false;
};

const getAllUsersWithSockets = () => {
  const usersWithSockets = users.filter((user) => user.socket_id !== undefined);
  return usersWithSockets.length > 0 ? usersWithSockets : false;
};

const findUserById = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return index !== -1 ? users[index] : false;
};

const findUserBySocketId = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  return index !== -1 ? users[index] : false;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

  return false;
};

const checkNewUser = (user) => {
  const errors = {};

  if (!checkGender(user.gender)) {
    errors.gender = 'Invalid gender!';
  }

  if (!checkAge(user.age)) {
    errors.age = 'Invalid age!';
  }

  if (!checkName(user.name)) {
    errors.name = 'Invalid name! You can use letters, numbers and spaces';
  }

  if (!checkCountry(user.country)) {
    errors.country = 'Invalid country!';
  }

  if (!checkAvatar(user.avatar)) {
    errors.avatar = 'Invalid avatar!';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { user, errors: false };
};

const checkAvatar = (avatar) => {
  const isMale = avatarsList['males'].indexOf(avatar) !== -1;
  const isFemale = avatarsList['females'].indexOf(avatar) !== -1;

  if (isMale || isFemale) {
    return true;
  }

  return false;
};

const checkCountry = (country) => {
  return countriesList.indexOf(country) !== -1;
};

const checkName = (name) => {
  name = name.trim();
  return name.match(/^[\w -]{1,15}$/);
};

const checkGender = (gender) => {
  if (gender === 'male' || gender === 'female') {
    return true;
  }

  return false;
};

const checkAge = (age) => {
  age = parseInt(age);

  if (!isNaN(age) && age <= 99 && age >= 1) {
    return true;
  }

  return false;
};

module.exports = {
  checkNewUser,
  addUser,
  removeUser,
  isUserExists,
  addUserSocketId,
  getAllUsersWithSockets,
  findUserBySocketId,
  findUserById,
  users,
};
