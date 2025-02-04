const { getAllUsers, postNewUser, getUser } = require('../models/usersModel');

exports.sendAllUsers = (req, res, next) => {
  getAllUsers().then((users) => {
    res.status(200).send({ users });
  })
    .catch(next);
};

exports.sendNewUser = (req, res, next) => {
  const newUser = req.body;
  postNewUser(newUser).then((user) => {
    res.status(200).send({ user });
  })
    .catch(next);
};

exports.sendUser = (req, res, next) => {
  const user = req.params;
  getUser(user).then((newUser) => {
    if (newUser.length > 0) return res.status(200).send({ user: newUser });
    return next({ msg: 'Error: no such user exists', status: 404 });
  })
    .catch(next);
};
