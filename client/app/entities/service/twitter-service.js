define(function (require) {
  var OauthService = require('entities/service/oauth-service');

  var TwitterService = OauthService.extend({

    defaults: _.defaults({
      type:      'twitter',
      iconClass: 'fa-twitter',
      name:      'Twitter'
    }, OauthService.prototype.defaults)
  });

  return TwitterService;
});
