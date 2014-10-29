var authUtil = require('../util/auth-util');
var appController = require('../controllers/app-controller');
var serviceController = require('../controllers/service-controller');

var apiRoutes = function (app, passport) {

  app.all('/api/apps/*', authUtil.ensureAuthenticated);
  app.all('/api/services/*', authUtil.ensureAuthenticated);

  // API endpoints
  // 1. Create an app
  app.get('/api/apps/', appController.list);
  app.get('/api/apps/:id', appController.find);
  app.post('/api/apps/', appController.create);
  app.put('/api/apps/', appController.update);
  app.delete('/api/apps/', appController.destroy);

  // 3. User space: User authenticates with API Network
  //    - Permission to access API Network
  //    - App implementer can choose their own auth scheme or use ours (get their user id from us)
  //    - Create account or user/pass
  //    - Trigger authentication loop auth -> subauth -> callback -> subauth -> callback -> app
  //    - Check creds if older than 10-20 mins. Providers can possibly return without prompting
  //      the user for another password.
  app.get('/api/apps/auth', appController.auth);

  // 4. User space: Looks into user/app and authenticates with whichever
  app.get('/api/apps/subauth', appController.subauth);
  app.get('/api/apps/subauth/callback', appController.subauthCallback);

  // 2. Add APIs to an app -> provide app token, app secret from, e.g., Facebook
  app.get('/api/services/', serviceController.list);
  app.post('/api/services/', serviceController.connect);
  app.put('/api/services/', serviceController.update);
  app.delete('/api/services/', serviceController.disconnect);
};

module.exports = apiRoutes;
