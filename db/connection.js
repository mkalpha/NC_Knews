const knex = require('knex');
const dbConfig = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : require('../knexfile');

module.exports = knex(dbConfig);
