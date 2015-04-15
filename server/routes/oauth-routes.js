var oauthController = require('../controllers/oauth-controller');

var apiRoutes = function (app) {

  app.get('/oauth/auth/:clientId/', oauthController.auth);
  app.get('/oauth/subauth/', oauthController.subauth);
  app.get('/oauth/subauth/callback/',
    oauthController.subauthCallback, oauthController.subauthCallbackComplete);
  app.get('/oauth/authorized/', oauthController.authorized);
};

module.exports = apiRoutes;
