var validator = require('../util/validator');
var uuid = require('node-uuid');
var async = require('async');
var Q = require('q');

var appController = {

  create: function (req, res) {
    req.app.db.models.OAuthApp
      .create({
        name: 'New APINetwork App',
        clientId: uuid.v4(),
        clientSecret: uuid.v4(),
        owner: req.user._id
      })
      .then(function (newApp) {
        res.json(newApp);
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  },

  update: function (req, res) {
    console.log('Updating app');
  },

  list: function (req, res) {
    req.app.db.models.OAuthApp
      .find({ owner: req.user._id
      })
      .exec()
      .then(function (apps) {
        res.json(apps);
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  },

  destroy: function (req, res) {
    if (validator.failMissing(req.body, ['_id'], res)) return;

    req.app.db.models.OAuthApp
      .remove({
        owner: req.user._id,
        _id: req.body._id
      })
      .exec()
      .then(function (product) {
        if (product > 0)
          res.send(200);
        else {
          res.send(404);
        }
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  },

  auth: function (req, res) {
    if (validator.failMissing(req.query, ['client_id'], res)) return;

    req.app.db.models.OAuthApp
      .findOne({
        clientId: req.query.client_id
      })
      .exec()
      .then(function (clientApp) {
        if (!clientApp) {
          res.send(404, 'Invalid client_id');
        } else {
          return req.app.db.models.OAuthToken
            .findOne({
              clientId: req.query.client_id, user: req.user._id
            })
            .exec();
        }
      })
      .then(function (token) {
        if (token) {
          req.session.apiNetworkToken = token.token;
          Q.nbind(req.session.save, req.session)()
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
        // Put the apiNetworkToken in the session.
        req.session.apiNetworkToken = newToken.token;
        return Q.nbind(req.session.save, req.session)();
      })
      .then(function () {
        res.redirect('/oauth/app/subauth');
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  },

  subAuth: function (req, res) {
    req.app.db.models.OAuthToken.findOne(
      { token: req.session.apiNetworkToken },
      function (error, token) {
        if (error)
          res.send(500, error.toString());
        else
        {
          if (token)
          {
            req.app.db.models.OAuthreq.App.findOne(
              { clientId: token.clientId },
              function (error, clientApp) {
                if (error)
                  res.send(500, error.toString());
                else if (clientApp)
                {

                  req.app.db.models.ApiConnection.find(
                    { app: clientreq.App._id },
                    function (error, connections) {
                      if (error)
                        res.send(500, error.toString());
                      else
                      {
                        if (connections)
                        {
                          // Search through all the connections until we find one for which we have tokens.
                          async.forEachSeries(connections, 
                            function (connection, done) {
                              req.app.db.models.ApiTokens.findOne(
                                { 
                                  user: req.user._id,
                                  apiConnection: connection._id
                                },
                                function (error, tokens) {
                                  if (!tokens || 
                                    (new Date().getTime() - tokens.timestamp) > 30000)
                                  {
                                    done(connection);
                                  }
                                  else
                                  {
                                    done();
                                  }
                                }
                              );
                            },
                            function (unauthenticated) {
                              if (unauthenticated)
                              {
                                // Authenticate that one, its callback should send us to oauth/app/subauth/callback.
                                req.session.apiNetworkCurrentRemote = unauthenticated._id;
                                req.session.save(function (error) {
                                  if (error)
                                    console.trace(error);

                                  req.app.passport.authenticate('remote', {
                                    type: unauthenticated.type,
                                    clientApp: clientreq.App._id,
                                    connectionData: unauthenticated.connectionData,
                                    callback: '/oauth/app/subauth/callback'
                                  })(req, res);
                                });
                              }
                              else
                              {
                                // If we don't find any, send us to the calling application.
                                res.send("TODO: All APIs authenticated, go back to app callback, with token: " + req.session.apiNetworkToken);
                              }
                            }
                          );
                        }
                        else
                        {
                          res.send("TODO: No connected APIs, go back to app callback, with token: " + req.session.apiNetworkToken);
                        }
                      }
                    }
                  );
                  // TODO: Get the list of data sources we need to authenticate with, and when we last authenticated.
                  // Hit the next one that we haven't authenticated with in the last minute.
                  // If we've got them all, then redirect to the app final callback.
                }
                else {
                  res.send(404, "Token corresponds to nonexistent req.app.");
                }
              }
            );
          }
          else {
            res.send(400, "Invalid Token");
          }
        }
      }
    );
  },

  subAuthCallback: function (req, res) {

    // Check for existence of an API connection to help prevent abuse.
    req.app.db.models.ApiConnection.findOne(
      { _id: req.session.apiNetworkCurrentRemote },
      function (error, connection) {
        if (error)
          res.send(500, error.toString());
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
                  res.send(500, error.toString());
                else {
                  if (tokens) {
                    tokens.timestamp = new Date().getTime(),
                    tokens.tokenSet = req.session.apiNetworkCurrentRemoteTokens;
                    tokens.save(function (error) {
                      if (error)
                        res.send(500, error.toString());
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
                          res.send(500, error.toString());
                        else
                          tokens.save(function (error) {
                            if (error)
                              res.send(500, error.toString);
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
            res.send(404, 'No connection found!: ' + req.session.apiNetworkCurrentRemote);
          }
        }
      }
    );
  }
};

module.exports = appController;
