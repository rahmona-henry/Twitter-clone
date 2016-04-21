var express = require('express');
// var hbs = require('hbs');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.static("public"));

app.get('/', function (req, res) {
  res.render('tweetPost');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
