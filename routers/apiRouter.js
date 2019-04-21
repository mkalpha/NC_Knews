const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('../routers/usersRouter');
const { endPoints } = require('../controllers/apiController')


apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.route('/')
        .get(endPoints)
        .all((req, res, next) => {
            res.status(405).send( { msg : "Method Not Allowed" })
        })
        
module.exports = apiRouter;
