const usersRouter = require('express').Router();
const { sendAllUsers, sendNewUser, sendUser } = require('../controllers/usersController');

usersRouter.route('/:username')
  .get(sendUser)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

usersRouter.route('/')
  .get(sendAllUsers)
  .post(sendNewUser)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

module.exports = usersRouter;
