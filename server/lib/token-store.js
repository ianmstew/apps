var _ = require('lodash');

function TokenStore(req) {
  this.request = req;
}

TokenStore.prototype.getUserTokens = function(owner, source, done) {
  var matches = source.match(/acct:([A-Za-z0-9]+):([A-Za-z0-9]+)/);
  var service = matches[1];
  var id = matches[2];
  var tokens = this.request.getAuthTokens(service);
  if (tokens) {
    if (tokens.owner === owner) {
      // TODO convert SERVICE_TOKENS to database linkage
      done(null, _.extend({}, tokens, SERVICE_TOKENS[service]));
    }
    else {
      done('You are not the owner of that URI');
    }
  }
  else {
    done('Not Authenticated to ' + service);
  }
};

module.exports = TokenStore;