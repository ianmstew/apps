var validator = require('../util/validator');
var uuid = require('node-uuid');
var Q = require('q');

var oauthController = {

  auth: function (req, res) {
    req.app.db.models.App
      // Find App model from clientId
      .findOne({
        clientId: req.params.clientId
      })
      .execQ()
      // Find AppToken for App model
      .then(function (clientApp) {
        if (!clientApp) {
          var error = new Error('Invalid clientId');
          error.type = 404;
          throw error;
        } else {
          return req.app.db.models.AppToken
            .findOne({
              clientId: req.params.clientId,
              owner: req.user._id
            })
            .execQ();
        }
      })
      // Create AppToken if necessary
      .then(function (appToken) {
        if (appToken) {
          // Token exists; pass along
          return appToken;
        } else {
          // No token; create one
          return req.app.db.models.AppToken
            .createQ({
              token: uuid.v4(),
              clientId: req.params.clientId,
              owner: req.user._id
            });
        }
      })
      // Save AppToken to session
      .then(function (appToken) {
        req.session.appToken = appToken;
        return Q.denodeify(req.session.save.bind(req.session))();
      })
      // Redirect to subauth
      .then(function () {
        res.redirect('/oauth/subauth');
      })
      .catch(null, function (error) {
        if (error.type === 404) {
          validator.failNotFound(res, error);
        } else {
          validator.failServer(res, error);
        }
      })
      .done();
  },

  subauth: function (req, res) {
    req.app.db.models.App
      .findOne({
        clientId: req.session.appToken.clientId
      })
      .execQ()
      // Get Services corresponding to App
      .then(function (app) {
        var services = req.app.db.models.Service
          .find({
            app: app._id,
            owner: req.user._id
          })
          .execQ();
        return [app, services];
      })
      // Attempt authentication with services
      .spread(function (app, services) {
        if (!services) {
          res.send('TODO: No connected APIs, go back to app callback, with token: ' +
            req.session.appToken.token);
        } else {
          return oauthController._authServices(req, res, app, services);
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
    req.app.db.models.Service
      // Check for existence of an API service to help prevent abuse.
      .findOne({
        _id: req.session.service
      })
      .execQ()
      .then(function (service) {
        if (!service) {
          var error = new Error('Not found');
          error.type = 404;
          throw error;
        }

        var serviceToken = req.app.db.models.ServiceToken
          .findOne({
            service: service._id,
            owner: req.user._id
          })
          .execQ()
          .done();

        return [service, serviceToken];
      })
      .spread(function (service, serviceToken) {
        // If this service has tokens already, update and move on
        if (serviceToken) {
          serviceToken.timestamp = new Date().getTime();
          // Current remote tokens parsed and set automatically within lib/multi-passport.js
          serviceToken.tokenSet = req.session.serviceTokens;
          serviceToken
            .saveQ()
            .then(function () {
              res.redirect('/oauth/subauth');
            })
            .done();
        }
        // If this service does not have tokens, create them and move on
        else {
          var _serviceToken = {
            service: service._id,
            owner: req.user._id,
            timestamp: new Date().getTime(),
            tokenSet: req.session.serviceTokens
          };

          req.app.db.models.ServiceToken
            .createQ(_serviceToken)
            .then(function () {
              res.redirect('/oauth/subauth');
            })
            .done();
        }
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

  // Given the list of all services for an app, authenticate the first un-authenticated service.
  _authServices: function (req, res, app, services) {
    var NOT_AUTHENTICATED = 'Not authenticated';

    // Perform a serial iteration over services and authenticate with the first service
    // without recent tokens.
    // Array reduce approach based loosely on https://github.com/kriskowal/q#sequences
    return services.reduce(function (memo, service) {
      return memo
        // Find service token
        .then(function () {
          return req.app.db.models.ServiceToken
            .findOne({
              owner: req.user._id,
              service: service._id
            })
            .execQ();
        })
        // Determine if token is valid
        .then(function (token) {
          var error;
          if (!token || (new Date().getTime() - token.timestamp) > 30000) {
            // Invalid token; throw NOT_AUTHENTICATED error
            error = new Error(NOT_AUTHENTICATED);
            error.type = NOT_AUTHENTICATED;
            error.service = service;
            throw error;
          }
        });
    }, Q())
    // No services without tokens
    .then(function () {
      // If all services have valid tokens, send us to the calling application
      res.send('TODO: All APIs authenticated, go back to app callback, with token: ' +
        req.session.appToken.token);
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
    // Authenticate service. Its callback should send us to api/oauth/subauth/callback.
    req.session.service = service._id;
    return Q.denodeify(req.session.save.bind(req.session))()
      .then(function () {
        // TODO: ERROR: 'remote' not recognized as an authentication strategy
        //   - see lib/multi-passport.js:58
        req.app.passport.authenticate('remote', {
          type: service.type,
          clientApp: app._id,
          connectionData: service.connectionData,
          callback: '/oauth/subauth/callback'
        })(req, res);
      });
  }
};

module.exports = oauthController;
