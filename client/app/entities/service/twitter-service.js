define(function (require) {
  var Backbone = require('backbone');
  var Cocktail = require('backbone.cocktail');
  var ServiceMixin = require('entities/service/service.mixin');

  var TwitterService = Backbone.Model.extend({

    defaults: {
      type: 'twitter',

      // Computed
      clientId: null,
      clientSecret: null,

      // View only
      callbackUrl: 'https://apinetwork.co/oauth/subauth/callback/',
      iconClass: 'fa-twitter',
      name: 'Twitter'
    },

    computed: {
      clientId: {
        depends: ['connectionData'],
        get: function (fields) {
          return fields.connectionData.consumerKey;
        },
        set: function (value, fields) {
          fields.connectionData = fields.connectionData || {};
          fields.connectionData.consumerKey = value;
        }
      },

      clientSecret: {
        depends: ['connectionData'],
        get: function (fields) {
          return fields.connectionData.consumerSecret;
        },
        set: function (value, fields) {
          fields.connectionData = fields.connectionData || {};
          fields.connectionData.consumerSecret = value;
        }
      }
    }
  });

  Cocktail.mixin(TwitterService, ServiceMixin);

  return TwitterService;
});
