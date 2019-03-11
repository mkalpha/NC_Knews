const { topicData } = require('../db/data');



exports.seed = function(knex, promise) {
    return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>{
        return knex('topics').insert(topicData).into('topics');
    });
   
}