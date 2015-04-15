var validator = require('../util/validator');
var uuid = require('node-uuid');
var Q = require('q');
var url = require('url');
var NOT_AUTHENTICATED = 'Not authenticated';

function redirectToAppCallback(res, app, appToken) {
  var oauthCallback = app.oauthCallback;
  var token = appToken.token;
  var urlObj;

  // Parse callback URL and add client app token to query parameter
  urlObj = url.parse(oauthCallback);
  if (urlObj.search) {
    urlObj.search += '&appToken=' + token;
  }
  else {
    urlObj.search = 'appToken=' + token;
  }
  oauthCallback = url.format(urlObj);

  // Redirect user to callback
  res.redirect(oauthCallback);
}

var oauthController = {

  authorized: function (req, res) {
    var appToken = req.query.appToken;
    req.app.db.models.ServiceToken
      // Find App model from clientId
      .find({
        appToken: appToken
      })
      .populate('service')
      .execQ()
      .then(function (serviceTokens) {
        if (!serviceTokens) serviceTokens = [];
        var authorizedServices = serviceTokens.map(function (serviceToken) {
          return serviceToken.service.type;
        });
        res.json(authorizedServices);
      });
  },

  auth: function (req, res) {
    var session = req.session;
    if (!session.appTokens) session.appTokens = {};
    var clientId = req.params.clientId;

    req.app.db.models.App
      // Find App model from clientId
      .findOne({
        clientId: clientId
      })
      .execQ()
      // Find AppToken for App model
      .then(function (app) {
        if (!app) {
          var error = new Error('Invalid clientId');
          error.type = 404;
          throw error;
        }

        // If user has an active API Network session with the client app, check for existing
        // and valid appToken (true if user has authenticated at all within current session)
        var appToken = session.appTokens[clientId];
        if (appToken) {
          appToken = req.app.db.models.AppToken
            .findOne({
              app: app._id,
              token: appToken.token
            })
            .execQ();
        }

        // appToken expected to be undefined here if appToken is not within session
        return [app, appToken];
      })
      // Create AppToken if necessary
      .spread(function (app, appToken) {
        // No token; create one
        if (!appToken) {
          appToken = req.app.db.models.AppToken
            .createQ({
              token: uuid.v4(),
              app: app._id
            });
        }
        return [app, appToken];
      })
      // Save AppToken to session
      .spread(function (app, appToken) {
        session.appTokens[clientId] = appToken;
        session.lastClientId = clientId;
        session.lastApp = app;
        return Q.denodeify(session.save.bind(session))();
      })
      // Redirect to subauth
      .then(function () {
        res.redirect('/oauth/subauth');
      })
      .catch(function (error) {
        if (error.type === 404) {
          validator.failNotFound(res, error);
        } else {
          validator.failServer(res, error);
        }
      })
      .done();
  },

  subauth: function (req, res, next) {
    var session = req.session;
    if (!session.appTokens) session.appTokens = {};
    var clientId = session.lastClientId;
    var appToken = session.appTokens[clientId];

    if (!clientId) {
      var error = new Error('Bad request. Call /oauth/auth first.');
      error.type = 400;
      throw error;
    }
    else if (!appToken) {
      throw new Error('Problem retrieving appToken. Please contact support.');
    }

    req.app.db.models.App
      .findOne({
        clientId: clientId
      })
      .execQ()
      // Get Services corresponding to App
      .then(function (app) {
        var services = req.app.db.models.Service
          .find({
            app: app._id
          })
          .execQ();
        return [app, services];
      })
      // Attempt authentication with services
      .spread(function (app, services) {
        if (!services) {
          // There are no services registered with the app; redirect back to the app.
          redirectToAppCallback(res, app, appToken);
        } else {
          return oauthController._authServices(req, res, next, app, appToken, services);
        }
      })
      .catch(function (error) {
        if (error.type === 400) {
          validator.failParam(res, error);
        } else {
          validator.failServer(res, error);
        }
      })
      .done();
  },

  // Given the list of all services for an app, authenticate the first un-authenticated service.
  _authServices: function (req, res, next, app, appToken, services) {
    // Perform a serial iteration over services and authenticate with the first service
    // without recent tokens.
    // Array reduce approach based loosely on https://github.com/kriskowal/q#sequences
    return services.reduce(function (previous, service) {
      return previous
        // Find service token for appToken
        .then(function () {
          return req.app.db.models.ServiceToken
            .findOne({
              appToken: appToken.token,
              service: service._id
            })
            .execQ();
        })
        .then(function (serviceToken) {
          // If service token does not exist, trigger service authentication.
          if (!serviceToken) {
            var error = new Error();
            error.type = NOT_AUTHENTICATED;
            error.service = service;
            throw error;
          }
        });
    }, Q())
    // All services have service tokens. Redirect to app callback with appToken.
    .then(function () {
      redirectToAppCallback(res, app, appToken);
    })
    .catch(function (error) {
      if (error.type === NOT_AUTHENTICATED) {
        var service = error.service;
        // Caught NOT_AUTHENTICATED; go ahead and authenticate
        return oauthController._authService(req, res, next, appToken, service);
      } else {
        throw error;
      }
    });
  },

  _authService: function (req, res, next, appToken, service) {
    var session = req.session;
    session.lastService = service;

    // Save service id to session.
    return Q.denodeify(session.save.bind(session))()
      // Trigger multi-passport authentication for service.
      .then(function () {
        req.app.passport.authenticate('multi', {
          type: service.type,
          clientApp: appToken.token,
          connectionData: service.connectionData,
          next: next
        })(req, res, next);
      });
  },

  subauthCallback: function (req, res, next) {
    var session = req.session;
    var appToken = session.appTokens[session.lastClientId];
    var service = session.lastService;

    if (!appToken || !service) {
      validator.failServer(res, 'Problem retrieving appToken or service. Please contact support.');
      return;
    }

    req.app.passport.authenticate('multi', {
      type: service.type,
      clientApp: appToken.token,
      next: next
    })(req, res, next);
  },

  subauthCallbackComplete: function (req, res) {
    var session = req.session;
    var app = session.lastApp;
    var appToken = session.appTokens[session.lastClientId];

    if (!app || !appToken) {
      validator.failServer(res, 'Problem retrieving app or appToken. Please contact support.');
      return;
    }

    redirectToAppCallback(res, app, appToken);
  }
};

module.exports = oauthController;
