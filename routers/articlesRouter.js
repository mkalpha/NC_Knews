const articlesRouter = require('express').Router();
const { sendAllArticles, addArticle } = require('../controllers/articlesController');

articlesRouter.get('/', sendAllArticles);

articlesRouter.post('/', addArticle);

module.exports = articlesRouter;
