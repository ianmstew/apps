var httpController = require('../views/http/index');

var routes = function (app, passport) {
  require('./oauth-routes')(app, passport);
  require('./static-pages-routes')(app, passport);
  require('./login-logout-routes')(app, passport);
  require('./admin-routes')(app, passport);
  require('./account-routes')(app, passport);
  require('./api-routes')(app, passport);
  require('./user-routes')(app, passport);
  require('./pdm-routes')(app, passport);

  // Used by Phusion Passenger to "wake up" node process on nginx server start
  app.get('/status', function (req, res) {
    res.send('OK');
  });

  app.get('/fail', function (req, res) {
    res.send('Fail');
  });

  // route not found
  app.all('*', httpController.http404);
};

module.exports = routes;
