var validator = require('../util/validator');
var uuid = require('node-uuid');
var Q = require('q');

var oauthController = {

  auth: function (req, res) {
    req.app.db.models.App
      // Confirm App model exists by looking up its clientId
      .findOne({
        clientId: req.params.clientId
      })
      .execQ()
      // Get AppToken for App model
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
      // Store AppToken to session and redirect to subauth, creating one if necessary
      .then(function (appToken) {
        if (appToken) {
          // Token found; redirect to subauth (passing token in session)
          req.session.appToken = appToken;

          Q.denodeify(req.session.save.bind(req.session))()
            .then(function () {
              res.redirect('/oauth/subauth');
            })
            .catch(validator.failServer.bind(null, res))
            .done();
        } else {
          // No token; create one
          req.app.db.models.AppToken
            .createQ({
              token: uuid.v4(),
              clientId: req.params.clientId,
              owner: req.user._id
            })
            .then(function (appToken) {
              req.session.appToken = appToken;
              return Q.denodeify(req.session.save.bind(req.session))();
            })
            .then(function () {
              res.redirect('/oauth/subauth');
            })
            .catch(validator.failServer.bind(null, res))
            .done();
        }
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
          oauthController._ensureServicesAuth(req, res, services, app);
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
          serviceToken.timestamp = new Date().getTime(),
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

  _ensureServicesAuth: function (req, res, services, app) {
    var NOT_AUTHENTICATED = 'Not authenticated';

    // Perform a serial iteration over services and authenticate with the first service
    // without recent tokens.
    // Array reduce approach based loosely on https://github.com/kriskowal/q#sequences
    services.reduce(function (prevService, service) {
      return prevService.then(function () {
        req.app.db.models.ServiceToken
          .findOne({
            owner: req.user._id,
            service: service._id
          })
          .execQ()
          .then(function (tokens) {
            if (!tokens || (new Date().getTime() - tokens.timestamp) > 30000) {
              oauthController._authService(req, res, service, app);
              // Break promise-chain iteration
              throw new Error(NOT_AUTHENTICATED);
            }
          });
      });
    }, Q())
    // No services without tokens
    .then(function () {
      // If all services have valid tokens, send us to the calling application
      res.send('TODO: All APIs authenticated, go back to app callback, with token: ' +
        req.session.appToken.token);
    })
    .catch(function (error) {
      // Trap Not Authenticated error and rethrow any others
      if (error.message !== NOT_AUTHENTICATED) {
        throw error;
      }
    })
    .done();
  },

  _authService: function (req, res, service, app) {
    // Authenticate service. Its callback should send us to api/oauth/subauth/callback.
    req.session.service = service._id;
    Q.denodeify(req.session.save.bind(req.session))()
      .then(function () {
        // TODO: ERROR: 'remote' not recognized as an authentication strategy
        //   - see lib/multi-passport.js:58
        req.app.passport.authenticate('remote', {
          type: service.type,
          clientApp: app._id,
          connectionData: service.connectionData,
          callback: '/oauth/subauth/callback'
        })(req, res);
      })
      .catch(function (error) {
        console.warn('authService error', error.stack);
      })
      .done();
  }
};

module.exports = oauthController;
