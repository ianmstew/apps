var validator = require('../util/validator');
var uuid = require('node-uuid');
var Q = require('q');
var url = require('url');
var NOT_AUTHENTICATED = 'Not authenticated';

function redirectToAppCallback(res, oauthCallback, appToken) {
  var urlObj;

  // Parse callback URL and add client app token to query parameter
  urlObj = url.parse(oauthCallback);
  if (urlObj.search) {
    urlObj.search += '&appToken=' + appToken;
  }
  else {
    urlObj.search = 'appToken=' + appToken;
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
              token: appToken
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
        session.appTokens[clientId] = appToken.token;
        session.lastClientId = clientId;
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
      throw new Error('Problem retrieving appToken. Please report to support.');
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
          redirectToAppCallback(res, app.oauthCallback, appToken);
        } else {
          return oauthController._authServices(req, res, next, app, services, appToken);
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

  subauthCallback: function (req, res, next) {
    var session = req.session;
    var serviceId = session.lastServiceId;
    var serviceType = session.lastServiceType;

    if (!serviceId || !serviceType) {
      validator.failServer(res, 'Problem retrieving serviceId/Type. Please report to support.');
      return;
    }

    req.app.passport.authenticate('remote', {
      type: serviceType,
      next: next
    }, next)(req, res, next);
  },

  subauthCallbackComplete: function (req, res) {
    res.send('Success');
  },

  // Given the list of all services for an app, authenticate the first un-authenticated service.
  _authServices: function (req, res, next, app, services, appToken) {
    // Perform a serial iteration over services and authenticate with the first service
    // without recent tokens.
    // Array reduce approach based loosely on https://github.com/kriskowal/q#sequences
    return services.reduce(function (previous, service) {
      return previous
        // Find service token for appToken
        .then(function () {
          return req.app.db.models.ServiceToken
            .findOne({
              appToken: appToken,
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
      redirectToAppCallback(res, app.oauthCallback, appToken);
    })
    .catch(function (error) {
      if (error.type === NOT_AUTHENTICATED) {
        // Caught NOT_AUTHENTICATED; go ahead and authenticate
        return oauthController._authService(req, res, next, app, error.service);
      } else {
        throw error;
      }
    });
  },

  _authService: function (req, res, next, app, service) {
    var session = req.session;
    session.lastServiceId = service._id;
    session.lastServiceType = service.type;

    // Save service id to session.
    return Q.denodeify(session.save.bind(session))()
      // Trigger multi-passport authentication for service.
      .then(function () {
        req.app.passport.authenticate('remote', {
          type: service.type,
          connectionData: service.connectionData,
          next: next
        })(req, res, next);
      });
  }
};

module.exports = oauthController;
