const usersRouter = require('express').Router();
const { sendAllUsers, sendNewUser, sendUser } = require('../controllers/usersController');

usersRouter.get('/:username', sendUser);

usersRouter.route('/:username')
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });


usersRouter.get('/', sendAllUsers);

usersRouter.post('/', sendNewUser);

usersRouter.route('/')
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

module.exports = usersRouter;
