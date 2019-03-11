const { topicData, userData, articleData } = require('../db/data');


exports.seed = function (knex, Promise) {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.insert(topicData).into('topics').returning('*'))
    .then(topicRows => knex.insert(userData).into('users').returning('*')
      .then((topicRows, userRows) => { // topics rows isn't being passed down the chain of promises

      }));
};
