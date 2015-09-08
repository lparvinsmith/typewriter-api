var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var uuid = require('uuid');
var MongoStore = require('connect-mongo')(session);
if (process.env.STAGE != "PRODUCTION") {
  process.env.SESSION_SECRET || require('dotenv').load();
};
var passport = require('./lib/passport');

var routes = require('./routes/index');
var stories = require('./routes/stories');
// var sections = require('./routes/sections');
// var images = require('./routes/images');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// CORS policy
app.use(cors({
 credentials: true,
 origin: 'http://localhost:5000', //change in production
 allowedHeaders: ['Cookie', 'Content-Type']
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// store session data in MongoDB and send to client as cookie
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true,
  store : new MongoStore({
    url : "mongodb://localhost/sessions" //change in production
  }),
  cookie : {
    maxAge : 600000 // 10 minutes - to keep user logged in for 24 hrs, do I change this?
    // req.session.cookie.expires = false; // cookie is currently set to not expire
  },
  genid : function(req) { // generates a new session id
    return uuid.v4({
      rng : uuid.nodeRNG
    });
  }
}));


// invokes method .initialize, mounts return value on app
// .initalize returns req.passport.user attached to session, or if not found creates empty obj
app.use(passport.initialize());
// invokes method .session, mounts return value on app
// If it finds a serialized user object in the session, it will consider the request authenticated.
app.use(passport.session());


app.use('/', routes);
app.use('/stories', stories);
// app.use('/sections', sections);
// app.use('/images', images);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
