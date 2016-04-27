
var knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'twitter_clone_dev'
  },
  useNullAsDefault: true
})

var app = require('./app')(knex)

app.listen(3000, function () {
  console.log('Example app listening on port 3000! Yep! Its true!');
});
