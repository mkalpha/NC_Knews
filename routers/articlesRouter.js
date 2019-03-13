const articlesRouter = require('express').Router();
const {
  sendAllArticles, addArticle, sendArticle, changeArticle,
} = require('../controllers/articlesController');

articlesRouter.get('/:article_id', sendArticle);

articlesRouter.patch('/:article_id', changeArticle);

articlesRouter.get('/', sendAllArticles);

articlesRouter.post('/', addArticle);

module.exports = articlesRouter;
