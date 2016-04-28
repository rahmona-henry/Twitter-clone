var bcrypt = require('bcrypt')
var config = require('./config.js')
//yo
module.exports = function(knex) {
  //=========================================//
  //========== GET routes ===================//
  //=========================================//
  var app = config(knex)

  app.get('/', function (req, res) {
    if (!req.session.userId) {
      res.redirect('/signIn');
    } else {
      res.render('secret', { id: req.session.userId })
    }
  })

  app.get('/newTweet', function(req, res) {
    if (!req.session.userId) {
      res.redirect('/signIn');
    } else {
      res.render('tweetPost', { id: req.session.userId })
    }
  })

  app.get('/signUp', function (req, res) {
    res.render('signUp');
  });

  app.get('/signIn', function (req, res) {
    res.render('signIn');
  });

  app.get('/secret', function(req, res){
    if (!req.session.userId) {
      res.redirect('/signIn')
    } else {
      res.render('secret', { userId: req.session.userId })
    }
  })

  app.get('/allTweets', function (req, res) {
    if (!req.session.userId) {
      res.redirect('/signIn')
    } else {
      knex.select().table('tweets')
      .then(function(data) {
        res.render('viewAllTweets', { userId: req.session.userId, data: data })
      })
    }
  })

  app.get('/user/:id', function (req, res) {
    if (!req.session.userId) {
      res.redirect('/signIn')
    } else {
    knex('tweets').where('userId', req.params.id)
      .then(function(data) {
        res.render('userProfileAndTweets', { userId: req.params.id, data: data })
      })
    }
  })

  app.get('/user/:id/follow', function(req, res){
    knex('follows').insert({followerId: req.session.userId, followingId: req.params.id})
    .then(function(data){
      console.log('success!' + req.session.userId + 'follows' + req.params.id + '(bam!)')
    })
  })

  app.get('/allFollowing/:id', function (req, res) {
      knex.from('follows').innerJoin('users', 'id', 'followerId').where( 'followerId', req.params.id )
      .then(function(data) {
        res.render('follows', { userId: req.params.id, data: data })
      })
  })

  app.get('/signOut', function (req, res) {
    req.session.destroy()
    res.render('signOut');
  })

  //=========================================//
  //============= POST routes ===============//
  //=========================================//

  app.post('/newTweet', function (req, res) {
    knex('tweets').insert({ tweeted: req.body.tweeted, userId: req.session.userId })
    .then(function(data){
      res.redirect('allTweets')
      console.log('Success! Creet posted by cretin #' + req.session.userId + '!')
    })
  })

  app.post('/signUp', function (req, res) {
    if (req.body.email === '') {
      res.redirect('/signUp')
    }
    var hash = bcrypt.hashSync( req.body.password, 10 )
    knex('users').insert({ email: req.body.email, hashed_password: hash })
    .then(function(data){
      console.log('this is "data" from sign-up', data)
      console.log("this is data[0]: ", data[0])
      req.session.userId = data[0]
      res.redirect('/secret')
    })
    .catch(function(error){
      console.log(error, 'problem')
      req.session.userId = 0
      res.redirect('/')
    })
  })

  app.post('/signIn', function(req, res){
    knex('users').where('email', req.body.email)
      .then(function(data) {
        console.log('this is "data" from sign in: ', data)
        if ( req.body.email === '' ) {
          res.redirect('/signIn')
        }
        else if (bcrypt.compareSync( req.body.password, data[0].hashed_password )) {
          req.session.userId = data[0].id
          // console.log("this is data[0].id: ", data[0].id)
          res.redirect('/secret')
          console.log('success! sign in happened by cretin #' + req.session.userId +'!')
        }
        else {
          console.log('incorrect password')
          res.redirect('/signIn')
        }
      })
      .catch(function(error){
        console.log('there has been a problem: ', error)
        req.session.userId = 0
        res.redirect('/signUp')
    })
  })

  return app
}
