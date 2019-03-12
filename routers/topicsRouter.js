const topicsRouter = require('express').Router();
const { sendAllTopics, addTopic } = require('../controllers/topicsController');

topicsRouter.get('/', sendAllTopics);

topicsRouter.post('/', addTopic);


module.exports = topicsRouter;
