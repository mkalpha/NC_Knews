const { patchComment } = require('../models/commentsModel');

exports.changeComment = (req, res, next) => {
  const comment_id = req.params;
  const votes = req.body;

  patchComment(votes, comment_id)
    .then((returnedComment) => {
      res.status(201).send({ returnedComment });
    })
    .catch(err => console.log(err));
};
