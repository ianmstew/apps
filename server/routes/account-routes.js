var authUtil = require('../util/auth-util');
var verificationController = require('../views/account/verification/index');
var settingsController = require('../views/account/settings/index');
var accountController = require('../views/account/index');

var accountRoutes = function (app) {

  app.all('/account/*', authUtil.ensureAuthenticated, authUtil.ensureAccount);

  // account
  app.get('/account/', accountController.init);

  // account > verification
  app.get('/account/verification/', verificationController.init);
  app.post('/account/verification/', verificationController.resendVerification);
  app.get('/account/verification/:token/', verificationController.verify);

  // account > settings
  app.get('/account/settings/', settingsController.init);
  app.put('/account/settings/', settingsController.update);
  app.put('/account/settings/identity/', settingsController.identity);
  app.put('/account/settings/password/', settingsController.password);
};

module.exports = accountRoutes;
