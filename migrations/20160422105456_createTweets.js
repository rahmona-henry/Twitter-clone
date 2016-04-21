exports.up = function(knex, Promise) {
console.log('create table')

  return knex.schema.createTableIfNotExists('tweets', function(table) {
    table.increments('id');
    table.string('tweeted');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tweets').then(function () {
    console.log('tweets table was dropped')
  })
};
