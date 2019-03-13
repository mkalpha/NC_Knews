const connection = require('../db/connection');

exports.patchComment = ((votes, comment_id) => connection('comments').where('comment_id', comment_id.comment_id).increment('votes', votes.inc_votes).returning('*')
  .catch(err => console.log(err)));

  exports.deletecomment = (comment => connection('comments').where('comment_id', comment.comment_id).del()
  .catch(err => console.log(err)));