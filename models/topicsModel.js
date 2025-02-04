const connection = require('../db/connection');

exports.fetchAllTopics = () => connection('topics').select('slug', 'description').from('topics');

exports.postTopic = topic => connection('topics').insert(topic).returning('*');

exports.fetchSingleTopic = (topic) => {
  connection('topics').select('slug', 'description').from('topics').where('topics.slug', topic);
};
