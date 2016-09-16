var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.applyRoutes = function(){
  var api = require('./routes/api.js');
  var apiRoute = "/api/v1"
  console.log('Loading Routes...')

  this.use(`${apiRoute}/notes`, api.notes());
  this.use(`${apiRoute}/users`, api.users());

  this.get('/', function(req, res, next) {
    console.log('Root INDEX.HTML served.')
    res.sendFile(path.join(__dirname, '/views', 'index.html'));
  });
}

app.applyRoutes();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.message = "Page not found";
  next(err);
});

// ERROR handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500);
    res.status(404).send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.status(404).send({
    message: err.message,
    error: err
  });
});


module.exports = app;

