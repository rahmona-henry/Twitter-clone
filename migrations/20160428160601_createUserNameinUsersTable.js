exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('userName')
    console.log('create userName field in usersTable')
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.table.dropColumn('userName')
  .then(function(){
    console.log('userName field was dropped')
  })
};
