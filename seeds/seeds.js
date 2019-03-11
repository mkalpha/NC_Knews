const { topicData, userData } = require('../db/data');



exports.seed = function(knex, promise) {
    return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() =>{
        return knex.insert(topicData).into('topics').returning('*');
    })
    .then((topicRows)=> {
        return knex.insert(userData).into('users').returning('*');
    })
   
}