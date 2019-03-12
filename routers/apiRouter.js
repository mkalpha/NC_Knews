const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');

console.log('in api router');

apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;
