define(function (require) {
  var Service = require('entities/service/service');

  var OauthService = Service.extend({

    defaults: _.defaults({
      // connectionData: {
      //   clientId:     undefined,
      //   clientSecret: undefined
      // },

      // View only
      callbackUrl:    'https://apinetwork.co/oauth/subauth/callback/',
      clientId:       undefined,
      clientSecret:   undefined
    }, Service.prototype.defaults),

    constructor: function () {
      this.on({
        'change:connectionData': this.onConnectionDataChanged
      }, this);
      OauthService.__super__.constructor.apply(this, arguments);
    },

    onConnectionDataChanged: function (oauthService, connectionData) {
      this.set({
        clientId: connectionData.clientId,
        clientSecret: connectionData.clientSecret
      });
    },

    toJSON: function () {
      var attrs = OauthService.__super__.toJSON.apply(this, arguments);
      if (attrs.clientId || attrs.clientSecret) {
        attrs.connectionData = {
          clientId: attrs.clientId,
          clientSecret: attrs.clientSecret
        };
      }
      return _.omit(attrs, 'callbackUrl', 'clientId', 'clientSecret');
    }
  });

  return OauthService;
});
