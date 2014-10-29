var validator = require('../util/validator');
var uuid = require('node-uuid');
var async = require('async');
var Q = require('q');

var appController = {

  find: function (req, res, id) {
    res.send('TODO: find app');
  },

  create: function (req, res) {
    req.app.db.models.App
      .createQ({
        name: req.body.name,
        clientId: uuid.v4(),
        clientSecret: uuid.v4(),
        user: req.user._id
      })
      .then(function (newApp) {
        res.json(newApp);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  update: function (req, res) {
    if (validator.failOnMissing(req.body, ['_id'], res)) return;
    res.send('TODO: app update method');
  },

  list: function (req, res) {
    req.app.db.models.App
      .find({
        user: req.user._id
      })
      .execQ()
      .then(function (apps) {
        res.json(apps);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  destroy: function (req, res) {
    if (validator.failOnMissing(req.body, ['_id'], res)) return;

    req.app.db.models.App
      .remove({
        user: req.user._id,
        _id: req.body._id
      })
      .execQ()
      .then(function (count) {
        if (count > 0) {
          if (count > 1) console.warn('Removed ' + count + ', expected 1');
          res.send(200);
        } else {
          validator.failNotFound(res);
        }
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  auth: function (req, res) {
    if (validator.failOnMissing(req.body, ['clientId'], res)) return;

    req.app.db.models.App
      // Confirm App model exists by looking up its clientId
      .findOne({
        clientId: req.body.clientId
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
              clientId: req.body.clientId,
              user: req.user._id
            })
            .execQ();
        }
      })
      // Store AppToken to session and redirect to subauth, creating one if necessary
      .then(function (token) {
        if (token) {
          // Token found; redirect to subauth (passing token in session)
          req.session.apiNetworkToken = token.token;

          Q.nbind(req.session.save, req.session)()
            .then(function () {
              res.redirect('/api/apps/subauth');
            })
            .catch(validator.failServer.bind(null, res))
            .done();
        } else {
          // No token; create one
          req.app.db.models.AppToken
            .createQ({
              token: uuid.v4(),
              clientId: req.query.clientId,
              user: req.user._id
            })
            .then(function (newToken) {
              req.session.apiNetworkToken = newToken.token;
              return Q.nbind(req.session.save, req.session)();
            })
            .then(function () {
              res.redirect('/api/apps/subauth');
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
    req.app.db.models.AppToken
      // Using session OAuth token, get AppToken model
      .findOne({
        token: req.session.apiNetworkToken
      })
      .execQ()
      // Get App model corresponding to AppToken
      .then(function (token) {
        if (!token) {
          var error = new Error('Invalid Token');
          error.type = 400;
          throw error;
        } else {
          return req.app.db.models.App
            .findOne({
              clientId: token.clientId
            })
            .execQ();
        }
      })
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
          res.send('TODO: No connected APIs, go back to app callback, with token: ' +
            req.session.apiNetworkToken);
          return;
        }
        this._ensureServicesAuth(req, res, services, app);
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

  _ensureServicesAuth: function (req, res, services, app) {
    var NOT_AUTHENTICATED = 'Not authenticated';

    // Perform a serial iteration over services and authenticate with the first service
    // without recent tokens.
    // Array reduce approach based loosely on https://github.com/kriskowal/q#sequences
    services.reduce(function (prevService, service) {
      return prevService.then(function () {
        req.app.db.models.ServiceToken
          .findOne({
            user: req.user._id,
            service: service._id
          })
          .execQ()
          .then(function (tokens) {
            if (!tokens || (new Date().getTime() - tokens.timestamp) > 30000) {
              this._authService(req, res, service, app);
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
        req.session.apiNetworkToken);
    })
    .catch(function (error) {
      // Trap Not Authenticated error and rethrow any others
      if (error.message !== NOT_AUTHENTICATED) {
        throw error;
      }
    })
  },

  _authService: function (req, res, service, app) {
    // Authenticate service. Its callback should send us to api/apps/subauth/callback.
    req.session.apiNetworkCurrentRemote = service._id;
    Q.nbind(req.session.save, req.session)()
      .then(function () {
        req.app.passport.authenticate('remote', {
          type: service.type,
          clientApp: app._id,
          connectionData: service.connectionData,
          callback: '/api/apps/subauth/callback'
        })(req, res);
      })
      .catch(function (error) {
        console.warn('authService error', error);
      })
  },

  subauthCallback: function (req, res) {
    req.app.db.models.Service
      // Check for existence of an API service to help prevent abuse.
      .findOne({
        _id: req.session.apiNetworkCurrentRemote
      }
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
            user: req.user._id
          })
          .execQ();

        return [service, serviceToken];
      })
      .spread(function (service, serviceToken) {
        // If this service has tokens already, update and move on
        if (serviceToken) {
          serviceToken.timestamp = new Date().getTime(),
          // Current remote tokens parsed and set automatically within lib/multi-passport.js
          serviceToken.tokenSet = req.session.apiNetworkCurrentRemoteTokens;
          serviceToken
            .saveQ()
            .then(function () {
              res.redirect('/oauth/app/subauth');
            });
        }
        // If this service does not have tokens, create them and move on
        else {
          var _serviceToken = {
            service: service._id,
            user: req.user._id,
            timestamp: new Date().getTime(),
            tokenSet: req.session.apiNetworkCurrentRemoteTokens
          };

          req.app.db.models.ServiceToken
            .createQ(_serviceToken)
            .then(function () {
              res.redirect('/oauth/app/subauth');
            });
        }
      })
      .catch(function (error) {
        if (error.type === 404) {
          validator.failNotFound(res, error);
        } else {
          validator.failServer(res, error);
        }
      })
    );
  }
};

module.exports = appController;
