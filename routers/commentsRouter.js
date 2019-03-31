const commentsRouter = require('express').Router();
const { changeComment, removeComment } = require('../controllers/commentsController');

commentsRouter.route('/:comment_id')
  .patch(changeComment)
  .delete(removeComment)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

commentsRouter.route('/')
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });
module.exports = commentsRouter;
