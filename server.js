var express = require('express');
// var hbs = require('hbs');
var app = express();
var path = require('path');
var knex = require('knex')
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')
var session = require('express-session')

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


app.get('/', function (req, res) {
  res.render('tweetPost');
});

app.post('/newTweet', function (req, res) {
    console.log('this is req.body:', req.body)
  knex('tweets').insert({tweeted: req.body.tweeted})
  .then(function(data){
    // document.getElementById("form").reset()
//    res.send('success')
console.log('success')
  })
 // console.log('this is post knex:', req.body.tweeted)
})

app.get('/allTweets', function (req, res) {
  knex.select().table('tweets')
  .then(function(data) {
    res.render('viewAllTweets', { data: data })
    console.log('this is data: ', data)
  })
})

app.get('/newUser', function (req, res) {
  res.render('signUp');
});

app.post('/newUser', function (req, res) {
  var hash = bcrypt.hashSync( req.body.password, 10 )
  knex('users').insert({ email: req.body.email, hashed_password: hash })
  .then(function(data){
    req.session.userId = data
    res.redirect('/')
  })
  .catch(function(error){
    console.log(error, 'problem')
    req.session.userId = 0
    res.redirect('/')
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
