var _ = require('lodash');

module.exports = {
  strategies: function (passport) {

    var multipass = new (require('multi-passport').Strategy)({
      passport: passport
    }, function (username, password, done) {
      return done(new Error('Unimplemented'));
    });

    multipass.register(
      'facebook',
      require('passport-facebook').Strategy,
      function (options) {
        return _.extend(_.cloneDeep(options), {
          // Set this here - don't rely on the client API to specify where we should come back to
          // for security reasons.
          callbackURL: 'http://local.apinetwork.co:3000/oauth/callback/facebook',
          passReqToCallback: true
        });
      },
      function () {
        return function (req, accessToken, refreshToken, profile, done) {
          req.session.serviceTokens = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            profile: profile
          };
          done(null, profile);
        };
      });

    multipass.register(
      'twitter',
      require('passport-twitter').Strategy,
      function (options) {
        return _.extend(_.cloneDeep(options), {
          requestTokenURL: 'https://api.twitter.com/oauth/request_token',
          userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
          accessTokenURL: 'https://api.twitter.com/oauth/access_token',
          callbackUrl: 'http://local.apinetwork.co:3000/oauth/callback/twitter',
          // This one is required by passport strategies that extend OAuth.
          passReqToCallback: true
        });
      },
      function () {
        return function (req, token, tokenSecret, profile, done) {
          req.session.serviceTokens = {
            token: token,
            tokenSecret: tokenSecret,
            profile: profile
          };
          done(null, profile);
        };
      });

    passport.use('remote', multipass);
  },

  callbacks: function (passport, app) {

    app.get('/oauth/callback/:connectionType/',
      function (req, res) {
        req.app.db.models.Service.findOne({
          _id: req.session.service
        }, function (error, connection) {
          if (error)
            res.send(500, error.toString());
          else if (connection) {
            passport.authenticate(connection.app + ':' + connection.type, {
              session: false
            })(req, res, function () {
              if (error)
                res.json(401, error);
              else {
                res.redirect('/oauth/subauth/callback/');
              }
            });
          }
        });
      }
   );
  }
};
