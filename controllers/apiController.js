const { fetchAllEndpoints } = require('../models/apiModel');

exports.endPoints = (req, res, next) => {
  fetchAllEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};
