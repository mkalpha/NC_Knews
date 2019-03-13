const { getAllUsers } = require('../models/usersModel');

exports.sendAllUsers = (req, res, next) => {
  getAllUsers().then((users) => {
    res.status(200).send({ users });
  });
};
