const articlesRouter = require('express').Router();
const {
  sendAllArticles, addArticle, sendArticle, changeArticle, removeArticle, getComments, addComment,
} = require('../controllers/articlesController');

articlesRouter.get('/:article_id/comments', getComments);

articlesRouter.post('/:article_id/comments', addComment);

articlesRouter.route('/:article_id/comments')
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });

articlesRouter.get('/:article_id', sendArticle);

articlesRouter.patch('/:article_id', changeArticle);

articlesRouter.delete('/:article_id', removeArticle);

articlesRouter.get('/', sendAllArticles);

articlesRouter.post('/', addArticle);


module.exports = articlesRouter;
