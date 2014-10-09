var validator = require('../util/validator');
var uuid = require('node-uuid');
var async = require('async');
var Q = require('q');
var _ = require('lodash');

var appController = {

  create: function (req, res) {
    req.app.db.models.App
      .create({
        name: req.body.name,
        clientId: uuid.v4(),
        clientSecret: uuid.v4(),
        owner: req.user._id
      })
    .then(function (newApp) {
      res.json(newApp);
    })
    .then(null, validator.failServer.bind(null, res));
  },

  update: function (req, res) {
    if (validator.failOnMissing(req.body, ['_id'], res)) return;
    console.log('Updating app');
  },

  list: function (req, res) {
    req.app.db.models.App
      .find({
        owner: req.user._id
      })
      .exec()
    .then(function (apps) {
      res.json(apps);
    })
    .then(null, validator.failServer.bind(null, res));
  },

  destroy: function (req, res) {
    if (validator.failOnMissing(req.body, ['_id'], res)) return;

    req.app.db.models.App
      .remove({
        owner: req.user._id,
        _id: req.body._id
      })
      .exec()
    .then(function (count) {
      if (!count) {
        res.json(200);
      } else {
        if (count > 1) console.warn('Removed ' + count + ', expected 1');
        res.json(404);
      }
    })
    .then(null, validator.failServer.bind(null, res));
  },

  auth: function (req, res) {
    if (validator.failOnMissing(req.query, ['client_id'], res)) return;

    req.app.db.models.App
      .findOne({
        clientId: req.query.client_id
      })
      .exec()
    .then(function (clientApp) {
      if (!clientApp) {
        validator.failNotFound('Invalid client_id');
      } else {
        return req.app.db.models.OAuthToken
          .findOne({
            clientId: req.query.client_id, user: req.user._id
          })
          .exec();
      }
    })
    .then(function (token) {
      var save;
      if (token) {
        req.session.apiNetworkToken = token.token;
        save = Q.nbind(req.session.save, req.session);

        save()
        .then(function () {
          res.redirect('/oauth/app/subauth');
        })
        .then(null, function (error) {
          throw error;
        });
      } else {
        return req.app.db.models.OAuthToken
          .create({
            token: uuid.v4(),
            clientId: req.query.client_id,
            user: req.user._id
          })
          .exec();
      }
    })
    .then(function (newToken) {
      var save;
      // Put the apiNetworkToken in the session.
      req.session.apiNetworkToken = newToken.token;
      save = Q.nbind(req.session.save, req.session);

      return save();
    })
    .then(function () {
      res.redirect('/oauth/app/subauth');
    })
    .then(null, validator.failServer.bind(null, res));
  },

  subAuth: function (req, res) {
    req.app.db.models.OAuthToken
      .findOne({
        token: req.session.apiNetworkToken
      })
      .exec()
    .then(function (token) {
      if (!token) {
        validator.failParam(res, 'Invalid Token');
      } else {
        return req.app.db.models.OAuthreq.App
          .findOne({
            clientId: token.clientId
          })
          .exec();
      }
    })
    .then(function (clientApp) {
      return req.app.db.models.Service
      .find({
        app: clientApp._id
      })
      .exec();
    })
    .then(function (connections) {
      if (!connections) {
        res.json('TODO: No connected APIs, go back to app callback, with token: ' +
          req.session.apiNetworkToken);
        return;
      }

      // TODO
      // connections.reduce(function (soFar, f) {
      //   return soFar.then(f);
      // }, Q(_.noop));

      // Search through all the connections until we find one for which we have tokens.
      async.forEachSeries(connections,
        function (connection, done) {
          req.app.db.models.ApiTokens.findOne({
            user: req.user._id,
            apiConnection: connection._id
          }).exec()
          .then(function (tokens) {
            if (!tokens || (new Date().getTime() - tokens.timestamp) > 30000) {
              done(connection);
            } else {
              done();
            }
          })
          .then(null, function (error) {
            done();
          });
        }, function (unauthenticated) {
          if (!unauthenticated) {
            // If we don't find any, send us to the calling application.
            res.json('TODO: All APIs authenticated, go back to app callback, with token: ' +
              req.session.apiNetworkToken);
            return;
          }

          // Authenticate that one, its callback should send us to oauth/app/subauth/callback.
          req.session.apiNetworkCurrentRemote = unauthenticated._id;
          req.session.save(function (error) {
            if (error) {
              console.warn(error);
            }
            req.app.passport.authenticate('remote', {
              type: unauthenticated.type,
              clientApp: clientreq.App._id,
              connectionData: unauthenticated.connectionData,
              callback: '/api/app/subauth/callback'
            })(req, res);
          });
        });
    })
    .then(null, validator.failServer.bind(null, res));
  },

  subAuthCallback: function (req, res) {

    // Check for existence of an API connection to help prevent abuse.
    req.app.db.models.Service.findOne(
      { _id: req.session.apiNetworkCurrentRemote },
      function (error, connection) {
        if (error)
          res.json(500, error.toString());
        else {
          if (connection) {
            // See if we already have a token set for this connection.
            req.app.db.models.ApiTokens.findOne(
              {
                apiConnection: connection._id,
                user: req.user._id
              },
              function (error, tokens) {
                if (error)
                  res.json(500, error.toString());
                else {
                  if (tokens) {
                    tokens.timestamp = new Date().getTime(),
                    tokens.tokenSet = req.session.apiNetworkCurrentRemoteTokens;
                    tokens.save(function (error) {
                      if (error)
                        res.json(500, error.toString());
                      else
                        res.redirect('/oauth/app/subauth');
                    });
                  }
                  else {
                    var tokenData = {
                      apiConnection: connection._id,
                      user: req.user._id,
                      timestamp: new Date().getTime(),
                      tokenSet: req.session.apiNetworkCurrentRemoteTokens
                    };

                    req.app.db.models.ApiTokens.create(
                      tokenData,
                      function (error, tokens) {
                        if (error)
                          res.json(500, error.toString());
                        else
                          tokens.save(function (error) {
                            if (error)
                              res.json(500, error.toString);
                            else
                              res.redirect('/oauth/app/subauth');
                          });
                      }
                    );
                  }
                }
              }
            );
          }
          else {
            res.json(404, 'No connection found!: ' + req.session.apiNetworkCurrentRemote);
          }
        }
      }
    );
  }
};

module.exports = appController;
