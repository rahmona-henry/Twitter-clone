
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    database: 'twitter_clone_dev'
  },
  useNullAsDefault: true
})

var app = require('./app')(knex)
var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '! Yep! Its true!');
});
