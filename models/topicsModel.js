const connection = require('../db/connection');

exports.fetchAllTopics = () => connection('topics').select('slug', 'description').from('topics').returning('*');

exports.postTopic = topic => connection('topics').insert(topic).returning('*');
