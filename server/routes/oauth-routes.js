var oauthController = require('../controllers/oauth-controller');

var apiRoutes = function (app, passport) {

  // NOTE: These routes are also referenced in lib/multi-passport.js

  // 1. User space: User authenticates with API Network
  //    - Permission to access API Network
  //    - App implementer can choose their own auth scheme or use ours (get their user id from us)
  //    - Create account or user/pass
  //    - Trigger authentication loop auth -> subauth -> callback -> subauth -> callback -> app
  //    - Check creds if older than 10-20 mins. Providers can possibly return without prompting
  //      the user for another password.
  app.get('/oauth/auth/:clientId/', oauthController.auth);
  app.get('/oauth/subauth/', oauthController.subauth);

  // 2. User space: Looks into user/app and authenticates with whichever
  app.get('/oauth/subauth/callback/', oauthController.subauthCallback);
};

module.exports = apiRoutes;
