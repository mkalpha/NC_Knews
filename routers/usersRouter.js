const usersRouter = require('express').Router();
const { sendAllUsers, sendNewUser, sendUser } = require('../controllers/usersController');

usersRouter.get('/:username', sendUser);

usersRouter.get('/', sendAllUsers);

usersRouter.post('/', sendNewUser);

module.exports = usersRouter;
