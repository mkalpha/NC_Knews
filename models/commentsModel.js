const connection = require('../db/connection');

exports.patchComment = ((votes, comment_id) => connection('comments').where('comment_id', comment_id.comment_id).increment('votes', votes.inc_votes).returning('*'));

exports.deleteComment = (comment => connection('comments').where('comment_id', comment.comment_id).del().returning('*'));
