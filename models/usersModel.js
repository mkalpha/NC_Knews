const connection = require('../db/connection');

exports.getAllUsers = () => connection('users').select('username', 'avatar_url', 'name').from('users').returning('*');

exports.postNewUser = user => connection('users').insert(user).returning('*');
