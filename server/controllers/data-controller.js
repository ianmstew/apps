var Q = require('q');
var validator = require('../util/validator');
var HttpError = validator.HttpError;
var PDM = require('personal-data-module');
var dataModule = new PDM.DataModule({
  services: ['facebook', 'twitter', 'gmail']
});
var uriBuilder = require('../lib/uri-builder');

function PDMTokenStore(tokenSet) {
  this.tokenSet = tokenSet;
}
PDMTokenStore.prototype.getUserTokens = function (owner, source, done) {
  done(null, this.tokenSet);
};

function handleDataRequest(req, res, createUri) {
  if (validator.failOnMissing(res, req.query, 'access_token')) {
    return;
  }
  var serviceType = req.params[0];
  var path = req.params[1];
  var token = req.query.access_token;

  req.app.db.models.Service
    // Ensure service exists
    .findOne({
      type: serviceType
    })
    .execQ()
    // Validate accessToken
    .then(function (service) {
      if (!service) {
        throw new HttpError(404, 'Service not found.');
      }
      var accessToken = req.app.db.models.AccessToken
        .findOne({
          token: token
        })
        .execQ();
      return [service, accessToken];
    })
    // Find serviceToken
    .spread(function (service, accessToken) {
      if (!accessToken) {
        throw new HttpError(400, 'Invalid access_token.');
      }
      var serviceToken = req.app.db.models.ServiceToken
        .findOne({
          appToken: accessToken.appToken,
          service: service._id
        })
        .execQ();
      return [service, serviceToken];
    })
    // Make data request
    .spread(function (service, serviceToken) {
      if (!serviceToken) {
        throw new HttpError(401, 'Service is not authorized for access_token.');
      }
      var uri = createUri(service, serviceToken, path);
      var dataTokenStore = new PDMTokenStore(serviceToken.tokenSet);
      var fetch = Q.nbind(dataModule.fetcher.fetch, dataModule.fetcher);
      return fetch(dataTokenStore, uri);
    })
    // Return data
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      validator.fail(res, error);
    })
    .done();
}

var dataController = {

  defaultQuery: function (req, res) {
    var createUri = function (service, serviceToken, path) {
      var serviceType = service.type;
      var accountId = serviceToken.tokenSet.accountId;
      return uriBuilder.default(serviceType, accountId, path);
    };
    handleDataRequest(req, res, createUri);
  }
};

module.exports = dataController;
