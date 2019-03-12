const connection = require('../db/connection');

exports.fetchAllTopics = () => {
  console.log('in the topic model');
  return connection('topics').select('slug', 'description').from('topics').returning('*');
};
