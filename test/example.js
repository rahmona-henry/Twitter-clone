var request = require('supertest')
var test = require('tape')
var cheerio = require('cheerio')
var app = require('../app')

test('visiting home page redirects to sign in', function(t) {
  request(app)
    .get('/')
    .end(function(err, res) {
      t.equals(302, res.status, 'http status is 302 (redirect)')
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

test('view sign in form', function(t) {
  request(app)
    .get('/signIn')
    .end(function(err, res) {
      console.log(res.text)
      $ = cheerio.load(res.text)
      //can you test some things about the form with cheerio
      t.end()
    })
})


//we need this to close the database after all the tests have run
//what happens if you delete it?
test('END', function(t) {
  app.knex.destroy()
  t.end()
})
