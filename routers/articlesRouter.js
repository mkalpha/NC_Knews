const articlesRouter = require('express').Router();
const { sendAllArticles } = require('../controllers/articlesController');

articlesRouter.get('/', sendAllArticles);

module.exports = articlesRouter;
