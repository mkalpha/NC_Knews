const articlesRouter = require('express').Router();
const { sendAllArticles, addArticle, sendArticle } = require('../controllers/articlesController');

articlesRouter.get('/:article_id', sendArticle);

articlesRouter.get('/', sendAllArticles);

articlesRouter.post('/', addArticle);

module.exports = articlesRouter;
