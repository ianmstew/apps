define(function (require) {
  var Backbone = require('backbone');
  var Cocktail = require('backbone.cocktail');
  var ServiceMixin = require('entities/service/service.mixin');

  var FacebookService = Backbone.Model.extend({

    defaults: {
      type: 'facebook',

      // Computed
      clientId: null,
      clientSecret: null,

      // View only
      callbackUrl: 'https://apinetwork.co/oauth/subauth/callback/',
      iconClass: 'fa-facebook',
      name: 'Facebook'
    },

    computed: {
      clientId: {
        depends: ['connectionData'],
        get: function (fields) {
          return fields.connectionData.clientID;
        }
      },

      clientSecret: {
        depends: ['connectionData'],
        get: function (fields) {
          return fields.connectionData.clientSecret;
        }
      }
    }
  });

  Cocktail.mixin(FacebookService, ServiceMixin);

  return FacebookService;
});
