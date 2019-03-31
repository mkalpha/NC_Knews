const connection = require('../db/connection');

exports.getAllUsers = () => connection('users').select('username', 'avatar_url', 'name').from('users');

exports.postNewUser = user => connection('users').insert(user).returning('*');
exports.getUser = user => connection('users').select('*').where('username', user.username);
