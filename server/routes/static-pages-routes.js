var signupController = require('../views/signup/index');
var loginController = require('../views/login/index');
var aboutController = require('../views/about/index');
var contactController = require('../views/contact/index');
var helpController = require('../views/help/index');
var legalController = require('../views/legal/index');
var privacyController = require('../views/privacy/index');
var termsController = require('../views/terms/index');

var staticPagesRoutes = function (app) {

  app.get('/', loginController.init);
  app.get('/about/', aboutController.init);
  app.get('/contact/', contactController.init);
  app.post('/contact/', contactController.sendMessage);
  app.get('/help/', helpController.init);
  app.get('/legal/', legalController.init);
  app.get('/terms/', termsController.init);
  app.get('/privacy/', privacyController.init);

  // sign up
  app.get('/signup/', signupController.init);
  app.post('/signup/', signupController.signup);
};

module.exports = staticPagesRoutes;
