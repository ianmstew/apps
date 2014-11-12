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
        }
      },

      clientSecret: {
        depends: ['connectionData'],
        get: function (fields) {
          return fields.connectionData.consumerSecret;
        }
      }
    }
  });

  Cocktail.mixin(TwitterService, ServiceMixin);

  return TwitterService;
});
