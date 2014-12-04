define(function (require) {
  var OauthService = require('entities/service/oauth-service');

  var GmailService = OauthService.extend({

    defaults: _.defaults({
      type:      'gmail',
      iconClass: 'fa-envelope',
      name:      'GMail'
    }, OauthService.prototype.defaults)
  });

  return GmailService;
});
