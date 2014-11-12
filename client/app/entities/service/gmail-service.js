define(function (require) {
  var Backbone = require('backbone');
  var Cocktail = require('backbone.cocktail');
  var ServiceMixin = require('entities/service/service.mixin');

  var GmailService = Backbone.Model.extend({

    defaults: {
      type: 'gmail',

      // Computed
      clientId: null,
      clientSecret: null,

      // View only
      callbackUrl: 'https://apinetwork.co/oauth/subauth/callback/',
      iconClass: 'fa-envelope',
      name: 'GMail'
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

  Cocktail.mixin(GmailService, ServiceMixin);

  return GmailService;
});
