const topicsRouter = require('express').Router();
const { sendAllTopics, addTopic } = require('../controllers/topicsController');

console.log('in topicsRouter');

topicsRouter.get('/', sendAllTopics);

topicsRouter.post('/', addTopic);


module.exports = topicsRouter;
