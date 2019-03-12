const topicsRouter = require('express').Router();
const { sendAllTopics } = require('../controllers/topicsController');

console.log('in topicsRouter');

topicsRouter.get('/', sendAllTopics);


module.exports = topicsRouter;
