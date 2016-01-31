var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();
    methodOverride = require('method-override'),
    compression = require('compression'),
    http = require('http'),
    path = require('path'),
    winston = require('winston')

var conString = "postgres://yuiztbkchhoqop:oKokli-_a1s9mRzO3TmnDC0VDH@ec2-54-227-249-166.compute-1.amazonaws.com:5432/d1i361s4l12e55";
//app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.set('view engine', 'jade');


app.get('/', function(req, res) {
  res.render('pages/login.jade');
});

app.get('/login', function(req, res) {
    res.render('pages/login.jade');
});

app.get('/register', function(req, res) {
    res.render('pages/register.jade');
});

app.post('/login', function(req, res) {
    //res.render('pages/profile.jade');
});

app.post('/register', function(req, res) {
    auth.signup;
});

/*
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/
app.listen(5000);
console.log('server ready')


