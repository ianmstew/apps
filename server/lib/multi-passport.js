function saveServiceToken(req, tokenSet, done) {
  var session = req.session;
  if (!session.appTokens) session.appTokens = {};
  var clientId = session.lastClientId;
  var serviceId = session.lastServiceId;
  var appToken = session.appTokens[clientId];

  if (!appToken || !serviceId) {
    done(new Error('Problem retrieving appToken or serviceId. Please report to support.'));
    return;
  }

  req.app.db.models.ServiceToken
    .findOne({
      service: serviceId,
      appToken: appToken
    })
    .execQ()
    .then(function (serviceToken) {
      // If this service has tokens already, update and move on
      if (serviceToken) {
        serviceToken.tokenSet = tokenSet;
        return serviceToken.saveQ();
      }
      // If this service does not have tokens, create them and move on
      else {
        return req.app.db.models.ServiceToken.createQ({
          service: serviceId,
          appToken: appToken,
          tokenSet: tokenSet
        });
      }
    })
    .then(function (serviceToken) {
      if (!serviceToken) {
        throw new Error('Issue saving service token');
      }
      done(null, {});
    })
    .catch(function (error) {
      console.log('>>>', error.stack);
      done(error);
    })
    .done();
}

module.exports = {

  // TODO: Add Gmail
  // TODO: Account for IMAP (ask Curtis if need be?)
  strategies: function (passport) {

    var multipass = new (require('multi-passport').Strategy)({
      passport: passport
    }, function (username, password, done) {
      return done(new Error('Unimplemented'));
    });

    multipass.register('facebook', require('passport-facebook').Strategy,
      // Prepare Passport request with client credentials
      function (connectionData) {
        return {
          clientID: connectionData.clientId,
          clientSecret: connectionData.clientSecret,
          callbackURL: 'http://local.apinetwork.co:3000/oauth/subauth/callback/',
          passReqToCallback: true
        };
      },
      function () {
        // Handle successful authorization response
        return function (req, accessToken, refreshToken, profile, done) {
          var tokenSet = {
            accessToken: accessToken
          };
          saveServiceToken(req, tokenSet, done);
        };
      });

    multipass.register('twitter', require('passport-twitter').Strategy,
      function (connectionData) {
        return {
          consumerKey: connectionData.clientId,
          consumerSecret: connectionData.clientSecret,
          callbackUrl: 'http://local.apinetwork.co:3000/oauth/subauth/callback/',
          passReqToCallback: true
        };
      },
      function () {
        return function (req, token, tokenSecret, profile, done) {
          var tokenSet = {
            token: token,
            tokenSecret: tokenSecret
          };
          saveServiceToken(req, tokenSet, done);
        };
      });

    passport.use('remote', multipass);
  }
};
