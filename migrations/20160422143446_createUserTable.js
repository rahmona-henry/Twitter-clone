exports.up = function(knex, Promise) {
console.log('create table')

  return knex.schema.createTableIfNotExists('users', function(table) {
    table.increments('id');
    table.string('email');
    table.string('hashed_password')
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').then(function () {
    console.log('users table was dropped')
  })
};
