const knex = require('knex');
const dbConfig = process.env.NODE_ENV === 'production' ? process.env : require('../knexfile');

module.exports = knex(dbConfig);
