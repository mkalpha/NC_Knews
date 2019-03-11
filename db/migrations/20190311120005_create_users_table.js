
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.string('username', 255).primary().unique();
    // left avatar nullable as user may not have one, may need to change this later
    // may also change to nvarchar(2083)
    usersTable.string('avatar_url');
    usersTable.string('name', 255).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
