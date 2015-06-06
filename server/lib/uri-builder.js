var _ = require('lodash');

var templates = {};

var compile = function (tpl) {
  return templates[tpl] || (templates[tpl] = _.template(tpl));
};

var uriBuilder = {

  default: function (serviceType, accountId, path) {
    return compile(
      'apinetwork://dummyOwner//@acct:<%= serviceType %>:<%= accountId %>/<%= path %>'
    )({ serviceType: serviceType, accountId: accountId, path: path });
  }
};

module.exports = uriBuilder;
