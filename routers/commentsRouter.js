const commentsRouter = require('express').Router();
const { changeComment, removeComment } = require('../controllers/commentsController');

commentsRouter.patch('/:comment_id', changeComment);

commentsRouter.delete('/:comment_id', removeComment);

module.exports = commentsRouter;
