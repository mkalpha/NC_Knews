const articlesRouter = require('express').Router();
const {
  sendAllArticles, addArticle, sendArticle, changeArticle, removeArticle, getComments, addComment,
} = require('../controllers/articlesController');

articlesRouter.route('/:article_id/comments')
  .get(getComments)
  .post(addComment)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

articlesRouter.route('/:article_id')
  .get(sendArticle)
  .patch(changeArticle)
  .delete(removeArticle)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

articlesRouter.route('/')
  .get(sendAllArticles)
  .post(addArticle)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

module.exports = articlesRouter;
