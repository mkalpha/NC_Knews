const commentsRouter = require('express').Router();
const { changeComment, removeComment } = require('../controllers/commentsController');

commentsRouter.patch('/:comment_id', changeComment);

commentsRouter.delete('/:comment_id', removeComment);

commentsRouter.route('/')
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });
module.exports = commentsRouter;
