var request = require('supertest')
var test = require('tape')
var cheerio = require('cheerio')
var app = require('../app')

test('visiting home page redirects to sign in', function(t) {
  request(app)
    .get('/')
    .end(function(err, res) {
      t.equals(res.status, 302, 'http status is 302 (redirect)')
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
    //  console.log(res.text)
      $ = cheerio.load(res.text)
    //  console.log($('a').text())
      t.equals($('a').text(), "Sign Up", 'text inside a tag is "Sign Up"' )
      //can you test some things about the form with cheerio
      t.end()
    })
})

test('signing in w/ correct email & pswd redirects to /secret', function(t){
  request(app)
    .post('/signIn')
    .type('form')
    .send({ email: 'what.the.dickenss@gmail.com', password: 'yes' })
    .end(function(err,res){
      console.log('this is res.text: ', res.text)
      console.log('res.status', res.status)
//      t.equals(res. )
    })
})

// test('basic testing on twitter server', function(t){
//   var result = twitterServer()
//   var expectedResult =
//
//   t.equal(result, expectedResult, '')
//   t.end()
//
// })

//we need this to close the database after all the tests have run
//what happens if you delete it?
test('END', function(t) {
  app.knex.destroy()
  t.end()
})
