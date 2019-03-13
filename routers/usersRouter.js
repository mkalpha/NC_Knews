const usersRouter = require('express').Router();
const { sendAllUsers, sendNewUser } = require('../controllers/usersController');

usersRouter.get('/', sendAllUsers);

usersRouter.post('/', sendNewUser);

module.exports = usersRouter;
