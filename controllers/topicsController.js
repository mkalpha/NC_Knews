const { fetchAllTopics } = require('../models/topicsModel');

exports.sendAllTopics = (req, res, next) => {
  console.log('in topics controller');
  console.log(req.body);

  fetchAllTopics().then((topics) => {
    res.status(200).send(topics);
  });
};
