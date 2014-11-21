'use strict';

// dependencies
var config     = require('./config');
var express    = require('express');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var http       = require('http');
var path       = require('path');
var passport   = require('passport');
// Wrapping mongoose in mongoose-q for conversion to q promises
var mongoose   = require('mongoose-q')(require('mongoose'));
var helmet     = require('helmet');

// create express app
var app = express();

// keep reference to config
app.config = config;

// setup the web server
app.server = http.createServer(app);

// setup mongoose
app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  // and... we have a data store
});

// use mongo for session storage
app.use(session({
  secret: config.cryptoKey,
  store: new MongoStore({ url: config.mongodb.uri })
}));

// config data models
require('./models')(app, mongoose);

// basic settings
app.disable('x-powered-by');
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// request logging
app.use(require('morgan')('dev'));

// gzip compression
app.use(require('compression')());

// static server app content
app.use(require('serve-static')(path.join(__dirname, 'public')));
// static client app content
app.use('/client', require('serve-static')(path.join(__dirname, '../client/build')));

// accept content as url-encoded or JSON
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

// handle json syntax errors without a 500
app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    res.send(400, error.message);
  } else {
    next();
  }
});

// other
app.use(require('method-override')());
app.use(require('cookie-parser')());

// basic express security settings
helmet.defaults(app);

// set up remote API authentication handlers
require('./lib/multi-passport.js').strategies(passport);

// inititalize passport
app.use(passport.initialize());
app.use(passport.session());
app.passport = passport;

// set up local access passport
require('./lib/passport')(app);

// set up routes
require('./routes')(app, passport);

// response locals--available to all view templates
app.use(function (req, res, next) {
  res.locals.user = {};
  res.locals.user.defaultReturnUrl = req.user && req.user.defaultReturnUrl();
  res.locals.user.username = req.user && req.user.username;
  next();
});

// global locals--available to all view templates
app.locals.projectName = app.config.projectName;
app.locals.copyrightYear = new Date().getFullYear();
app.locals.copyrightName = app.config.companyName;
app.locals.cacheBreaker = 'br34k-01';

// custom (friendly) error handler
app.use(require('./views/http/index').http500);

// setup utilities
app.utility = {};
app.utility.sendmail = require('./util/sendmail');
app.utility.slugify = require('./util/slugify');
app.utility.workflow = require('./util/workflow');

// listen up
app.server.listen(app.config.port, function () {
  console.log('Listening on ' + app.config.port + '...');
});

module.exports = app;
