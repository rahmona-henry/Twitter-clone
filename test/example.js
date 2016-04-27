var request = require('supertest')
var test = require('tape')
var cheerio = require('cheerio')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './test.sqlite3'
  },
  useNullAsDefault: true
})
var app = require('../app')(knex)

test('visiting home page redirects to sign in', function(t) {
  request(app)
    .get('/')
    .end(function(err, res) {
      t.equals(res.status, 302, 'http status is 302 (redirect)')
      t.end()
    })
})

//this test does the same as the one above
//which do you prefer?
test('visiting home page redirects to sign in 2', function(t) {
  request(app)
    .get('/')
    .expect(302)
    .end(function(err, res) {
      t.error(err, 'No error')
      t.end()
    })
})

test('visiting non-existent route returns 404', function(t) {
  request(app)
    .get('/hello')
    .end(function(err, res) {
      t.equals(res.status, 404, 'http status is 404 (not found/route/resource doesnt exist)')
      t.end()
    })
})

test('view sign in form', function(t) {
  request(app)
    .get('/signIn')
    .end(function(err, res) {
      $ = cheerio.load(res.text)
      t.equals($('a').text(), "Sign Up", 'text inside "a" tag is "Sign Up"' )
      //can you test some things about the form with cheerio
      t.end()
    })
})

test('signing in w/ correct email & pswd redirects to /secret', function(t){
  user = {email: 'testing.is.fun@gmail.com', password: 'password'}
  request(app)
    .post('/signUp')
    .type('form')
    .send(user)
    .end(function() {
      request(app)
        .post('/signIn')
        .type('form')
        .send(user)
        .end(function(err,res){
          t.equals(res.status, 302, 'response is redirect')
          t.equals(res.header.location, '/secret', 'redirects to secret page')
          knex('users').del().then(function() {
            t.end()
          })
        })
  })
})

test('signing in w/ blank fields redirects to /signIn', function(t){
  user = {email: '', password: ''}
  request(app)
    .post('/signIn')
    .type('form')
    .send(user)
    .end(function(err, res) {
      t.equals(res.status, 302, 'response is redirect')
      t.equals(res.header.location, '/signIn', 'redirects to sign in page')
       t.end()
    })
 })

 test('user can post a creet', function(t){
   user = {email: '', password: ''}
   request(app)
     .post('/signIn')
     .type('form')
     .send(user)
     .end(function(err, res) {
       t.equals(res.status, 302, 'response is redirect')
       t.equals(res.header.location, '/signIn', 'redirects to sign in page')
        t.end()
     })
  })

//we need this to close the database after all the tests have run
//what happens if you delete it?
test('END', function(t) {
  app.knex.destroy()
  t.end()
})
