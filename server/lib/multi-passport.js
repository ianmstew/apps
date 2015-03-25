var _ = require('lodash');

module.exports = {

  // TODO: Add Gmail
  // TODO: Account for IMAP (ask Curtis if need be?)
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
        options = _.merge({}, options, {
          callbackURL: 'http://local.apinetwork.co:3000/oauth/subauth/callback/',
          passReqToCallback: true
        });
        console.log('>>>', options);
        return options;
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
        return _.merge({}, options, {
          requestTokenURL: 'https://api.twitter.com/oauth/request_token/',
          userAuthorizationURL: 'https://api.twitter.com/oauth/authorize/',
          accessTokenURL: 'https://api.twitter.com/oauth/access_token/',
          callbackUrl: 'http://local.apinetwork.co:3000/oauth/subauth/callback/',
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
  }
};
