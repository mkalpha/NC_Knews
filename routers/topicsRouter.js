const topicsRouter = require('express').Router();
const { sendAllTopics, addTopic } = require('../controllers/topicsController');

topicsRouter.route('/')
  .get(sendAllTopics)
  .post(addTopic)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method Not Allowed' });
  });


module.exports = topicsRouter;
