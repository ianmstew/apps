var loginController = require('../views/login/index');
var forgotController = require('../views/login/forgot/index');
var resetController = require('../views/login/reset/index');
var logoutController = require('../views/logout/index');

var loginLogoutRoutes = function (app) {

  // login/out
  app.get('/login/', loginController.init);
  app.post('/login/', loginController.login);
  app.get('/login/forgot/', forgotController.init);
  app.post('/login/forgot/', forgotController.send);
  app.get('/login/reset/', resetController.init);
  app.get('/login/reset/:mail/:token/', resetController.init);
  app.put('/login/reset/:email/:token/', resetController.set);
  app.get('/logout/', logoutController.init);
};

module.exports = loginLogoutRoutes;
