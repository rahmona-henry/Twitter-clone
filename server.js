
var knex = require('knex')(config[env])
var config = require('./knexfile.js')
var env = process.env.NODE_ENV || 'development'
var port = process.env.PORT || 3000
var app = require('./app')(knex)


app.listen(port, function () {
  console.log('Example app listening on port ' + port + '! Yep! Its true!');
});
