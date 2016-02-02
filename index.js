var express = require('express'),
    bodyParser = require('body-parser'),
    pg = require('pg'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    http = require('http'),
    path = require('path'),
    winston = require('winston'),
    auth = require('./auth.js'),
    leads = require('./leads'),
    app = express();

// views is directory for all template files
app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.use(methodOverride());
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set('port', (process.env.PORT || 5000));


// Routes and Actions

app.get('/', function(req, res) {
  res.render('/pages/leads.jade');
});

app.get('/login', function(req, res) {
    res.render('pages/login.jade');
});

app.get('/register', function(req, res) {
    res.render('pages/register.jade');
});

app.get('/leads', leads.getAll);


app.get('/leads_edit', function(req, res) {
    res.render('pages/leads_edit.jade');
});

//app.post('/login', auth.login);

app.post('/login', urlencodedParser, function(req, res, next) {
    auth.login (req, res, next);
    res.render('/');
});

// once you register, will be routed to login page

app.post('/register', urlencodedParser, function(req, res, next) {
    auth.signup (req, res, next);
    //res.render('pages/login.jade');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// temporary routes - remove these later

app.get('/responsive', function(req, res) {
    res.render('pages/responsive.jade');
});

app.get('/leads3', function(req, res) {
    res.render('pages/leads3.jade', leads.getAll);
});

app.get('/employee', function(req, res) {
    res.render('pages/employee.jade');
});

app.get('/leads2', function(req, res) {
    res.render('pages/leads2.jade');
});

