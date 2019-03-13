const { patchComment, deleteComment } = require('../models/commentsModel');

exports.changeComment = (req, res, next) => {
  const comment_id = req.params;
  const votes = req.body;

  patchComment(votes, comment_id)
    .then((returnedComment) => {
      res.status(201).send({ returnedComment });
    })
    .catch(err => console.log(err));
};

exports.removeComment = (req, res, next) => {
    console.log('in comment controller delete');
    //get comment params
    const comment = req.params;
    deleteComment(comment)
    .then(() => {
        console.log('back in controller')
        res.status(204).send()
    })
};