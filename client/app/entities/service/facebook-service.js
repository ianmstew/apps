define(function (require) {
  var OauthService = require('entities/service/oauth-service');

  var FacebookService = OauthService.extend({

    defaults: _.defaults({
      type:      'facebook',
      iconClass: 'fa-facebook',
      name:      'Facebook'
    }, OauthService.prototype.defaults)
  });

  return FacebookService;
});
