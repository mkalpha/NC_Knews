const { patchComment, deleteComment } = require('../models/commentsModel');

exports.changeComment = (req, res, next) => {
  const comment_id = req.params;
  const votes = req.body;

  patchComment(votes, comment_id)

    .then((returnedComment) => {
      res.status(200).send({ returnedComment });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const comment = req.params;
  deleteComment(comment)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
