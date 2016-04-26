
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
})

var app = require('./app')(knex)

app.listen(3000, function () {
  console.log('Example app listening on port 3000! Yep! Its true!');
});
