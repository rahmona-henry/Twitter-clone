exports.up = function(knex, Promise) {
  return knex.schema.table('tweets', function (table) {
    table.integer('userId');
    console.log('create user Id Field')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table.dropColumn('userId')
  .then(function(){
    console.log('userId field was dropped')
  })
};
