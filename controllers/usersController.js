const { getAllUsers, postNewUser } = require('../models/usersModel');

exports.sendAllUsers = (req, res, next) => {
  getAllUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.sendNewUser = (req, res, next) => {
  const newUser = req.body;
  postNewUser(newUser).then((user) => {
    res.status(200).send({ user });
  });
};
