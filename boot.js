var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path');
var hbs = require('express-hbs')
var app = express();

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended:true }))

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
})

app.use(session({
  secret: 'ssshhhhhh! Top secret!',
  saveUninitialized: true,
  resave: true,
  db: knex
}))

module.exports = {
  app: app,
  knex: knex
}
