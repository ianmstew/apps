var httpController = require('../views/http/index');

var routes = function (app, passport) {
  require('./oauth-routes')(app, passport);
  require('./static-pages-routes')(app, passport);
  require('./login-logout-routes')(app, passport);
  require('./admin-routes')(app, passport);
  require('./account-routes')(app, passport);
  require('./api-routes')(app, passport);

  // route not found
  app.all('*', httpController.http404);
};

module.exports = routes;
