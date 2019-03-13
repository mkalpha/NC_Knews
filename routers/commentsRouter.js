const commentsRouter = require('express').Router();
const { changeComment } = require('../controllers/commentsController');

commentsRouter.patch('/:comment_id', changeComment);

module.exports = commentsRouter;
