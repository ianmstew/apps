var validator = require('../util/validator');
var uuid = require('node-uuid');
var Q = require('q');
var _ = require('lodash');
var url = require('url');

function redirectToAppCallback(res, oauthCallback, clientAppToken) {
  var urlObj;

  // Parse callback URL and add client app token to query parameter
  urlObj = url.parse(oauthCallback);
  if (urlObj.search) {
    urlObj.search += '&appToken=' + clientAppToken;
  }
  else {
    urlObj.search = '&appToken=' + clientAppToken;
  }
  oauthCallback = url.format(urlObj);

  // Redirect user to callback
  res.redirect(oauthCallback);
}

var oauthController = {

  authorized: function (req, res) {
    var clientAppToken = req.query.appToken;
    req.app.db.models.ServiceToken
      // Find App model from clientId
      .find({
        clientAppToken: clientAppToken
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
    var clientId = req.params.clientId;
    var session = req.session;

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
        var clientAppToken = session.clientAppTokens && session.clientAppTokens[clientId];
        var appToken;
        if (clientAppToken) {
          appToken = req.app.db.models.AppToken
            .findOne({
              app: app._id,
              clientAppToken: clientAppToken
            })
            .execQ();
        }

        // appToken expected to be undefined if clientAppToken is not within session
        return [app, appToken];
      })
      // Create AppToken if necessary
      .spread(function (app, appToken) {
        // No token; create one
        if (!appToken) {
          appToken = req.app.db.models.AppToken
            .createQ({
              clientAppToken: uuid.v4(),
              app: app._id
            });
        }
        return [app, appToken];
      })
      // Save AppToken to session
      .spread(function (app, appToken) {
        if (!session.clientAppTokens) session.clientAppTokens = {};
        session.clientAppTokens[clientId] = appToken.clientAppToken;
        session.lastClientId = clientId;
        // ClientID is inferred throughout the authentication cycle from the current clientId,
        // so make sure it is fresh (5 minutes).
        session.lastClientIdExpires = Date.now() + 300000;
        return Q.denodeify(req.session.save.bind(req.session))();
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

  subauth: function (req, res) {
    var session = req.session;
    var clientId = session.lastClientId;
    var clientIdExpires = session.lastClientIdExpires;
    var clientAppToken = session.clientAppTokens && session.clientAppTokens[clientId];
    var clientIdExpired = clientIdExpires && (Date.now() - clientIdExpires >= 0);

    // Ensure client has an active appToken, otherwise restart authorization
    if (!clientAppToken || clientIdExpired) {
      res.redirect('/oauth/auth/' + clientId + '/');
      return;
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
          redirectToAppCallback(res, app.oauthCallback, clientAppToken);
        } else {
          return oauthController._authServices(req, res, app, services, clientAppToken);
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

  subauthCallback: function (req, res) {
    // Oauth callback contains credentials as GET parameter
    var credentials = req.query;
    var session = req.session;

    var clientId = session.lastClientId;
    var clientIdExpires = session.lastClientIdExpires;
    var clientAppToken = session.clientAppTokens && session.clientAppTokens[clientId];
    var clientIdExpired = clientIdExpires && (Date.now() - clientIdExpires >= 0);

    var serviceId = session.lastServiceId;
    var serviceIdExpires = session.lastServiceIdExpires;
    var serviceIdExpired = serviceIdExpires && (Date.now() - serviceIdExpires >= 0);

    // Ensure serviceId and clientAppToken exist and are fresh
    if (!serviceId || serviceIdExpired || !clientAppToken || clientIdExpired) {
      res.redirect('/oauth/auth/' + clientId + '/');
      return;
    }

    // TODO: Solve redirect loop here
    req.app.db.models.ServiceToken
      .findOne({
        service: serviceId,
        clientAppToken: clientAppToken
      })
      .execQ()
      .then(function (serviceToken) {
        // If this service has tokens already, update and move on
        if (serviceToken) {
          _.extend(serviceToken, {
            credentials: credentials
          });
          return serviceToken.saveQ();
        }
        // If this service does not have tokens, create them and move on
        else {
          return req.app.db.models.ServiceToken.createQ({
            service: serviceId,
            owner: req.user._id,
            credentials: credentials
          });
        }
      })
      .then(function () {
        res.redirect('/oauth/subauth');
      })
      .catch(function (error) {
        validator.failServer(res, error);
      })
      .done();
  },

  // Given the list of all services for an app, authenticate the first un-authenticated service.
  _authServices: function (req, res, app, services, clientAppToken) {
    var NOT_AUTHENTICATED = 'Not authenticated';

    // Perform a serial iteration over services and authenticate with the first service
    // without recent tokens.
    // Array reduce approach based loosely on https://github.com/kriskowal/q#sequences
    return services.reduce(function (previous, service) {
      return previous
        // Find service token for clientAppToken
        .then(function () {
          return req.app.db.models.ServiceToken
            .findOne({
              clientAppToken: clientAppToken,
              service: service._id
            })
            .execQ();
        })
        .then(function (serviceToken) {
          var error;
          // If service token does not exist or does not contain credentials, trigger service
          // authentication.
          if (!serviceToken || !serviceToken.credentials) {
            error = new Error();
            error.type = NOT_AUTHENTICATED;
            error.service = service;
            throw error;
          }
        });
    }, Q())
    // All services have service tokens. Redirect to app callback with clientAppToken.
    .then(function () {
      redirectToAppCallback(res, app.oauthCallback, clientAppToken);
    })
    .catch(function (error) {
      if (error.type === NOT_AUTHENTICATED) {
        // Caught NOT_AUTHENTICATED; go ahead and authenticate
        return oauthController._authService(req, res, app, error.service);
      } else {
        throw error;
      }
    });
  },

  _authService: function (req, res, app, service) {
    var session = req.session;
    session.lastServiceId = service._id;
    // ClientID is inferred throughout the authentication cycle from this clientId, so make
    // sure it is fresh (5 minutes).
    session.lastServiceIdExpires = Date.now() + 30000;
    // Save service id to session.
    return Q.denodeify(req.session.save.bind(req.session))()
      // Trigger multi-passport authentication for service.
      .then(function () {
        req.app.passport.authenticate('remote', {
          type: service.type,
          connectionData: service.connectionData
        })(req, res);
      });
  }
};

module.exports = oauthController;
