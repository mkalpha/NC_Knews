const articlesRouter = require('express').Router();
const { sendAllArticles } = require('../controllers/articlesController');

console.log('in articles router!!');

articlesRouter.get('/', sendAllArticles);

module.exports = articlesRouter;
