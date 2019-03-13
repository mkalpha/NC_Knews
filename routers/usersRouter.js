const usersRouter = require('express').Router();
const { sendAllUsers } = require('../controllers/usersController');

usersRouter.get('/', sendAllUsers);

module.exports = usersRouter;
