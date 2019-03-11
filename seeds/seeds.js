const { topicData, userData, articleData } = require('../db/data');
const { createArticles } = require('../db/utils');

exports.seed = function (knex, Promise) {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.insert(topicData).into('topics').returning('*'))
    .then((topicRows) => knex.insert(userData).into('users').returning('*'))
      .then((userRows) => { 
        const articles = createArticles(articleData);
        return knex.insert(articles).into('articles').returning('*');
      });
};
