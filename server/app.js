'use strict';

// dependencies
var config     = require('./config');
var express    = require('express');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var http       = require('http');
var path       = require('path');
var passport   = require('passport');
var mongoose   = require('mongoose');
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

// accept content as JSON or url-encoded
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: false }));

// other
app.use(require('method-override')());
app.use(require('cookie-parser')());

// basic express security settings
helmet.defaults(app);

// setup passport
app.use(passport.initialize());
app.use(passport.session());
app.passport = passport;
require('./lib/passport')(app);
require('./lib/multi-passport.js').callbacks(passport, app);

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

// setup routes
require('./routes')(app, passport);

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
