const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('../routers/usersRouter');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
