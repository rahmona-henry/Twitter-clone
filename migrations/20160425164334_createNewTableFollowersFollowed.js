exports.up = function(knex, Promise) {
console.log('follows table created')

  return knex.schema.createTableIfNotExists('follows', function (table) {
    table.integer('followerId')
    table.integer('followingId')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('follows').then(function () {
    console.log('follows table was dropped')
  })
};
