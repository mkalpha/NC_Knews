const { fetchAllTopics, postTopic } = require('../models/topicsModel');

exports.sendAllTopics = (req, res, next) => {
  fetchAllTopics().then((topics) => {
    res.status(200).send({ topics });
  })
    .catch(next);
};

exports.addTopic = (req, res, next) => {
  const topic = req.body;
  postTopic(topic)
    .then(([newTopic]) => {
      res.status(201).send({ newTopic });
    })
    .catch(next);
};
