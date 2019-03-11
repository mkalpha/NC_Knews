
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title', 255).notNullable();
    articlesTable.string('body', 2000).notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic').references('slug').inTable('topics').notNullable();
    articlesTable.string('author').references('username').inTable('users').notNullable();
    articlesTable.date('created_at').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};