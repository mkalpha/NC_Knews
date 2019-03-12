const { fetchAllTopics, postTopic } = require('../models/topicsModel');

exports.sendAllTopics = (req, res, next) => {
  fetchAllTopics().then((topics) => {
    res.status(200).send(topics);
  });
};

exports.addTopic = (req, res, next) => {
  console.log('topics post controller');

  const topic = req.body;

  postTopic(topic)
    .then(([newTopic]) => {
      console.log(newTopic);
      res.status(201).send(newTopic);
    });
};
