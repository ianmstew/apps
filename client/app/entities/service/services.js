define(function (require, exports, module) {
  var Backbone = require('backbone');
  var FacebookService = require('entities/service/facebook-service');
  var TwitterService = require('entities/service/twitter-service');
  var GmailService = require('entities/service/gmail-service');
  var ImapService = require('entities/service/imap-service');

  var Services = Backbone.Collection.extend({

    url: function () {
      return '/api/apps/' + this.appId + '/services/';
    },

    modelId: function (attrs) {
      return attrs._id;
    },

    appId: undefined,

    // Set owning app for collection
    setAppId: function (appId) {
      this.appId = appId;
    },

    getAppId: function () {
      return this.appId;
    },

    model: function (attrs, options) {
      return Services.newModel(attrs, options);
    }
  }, {
    newModel: function (attrs, options) {
      switch (attrs.type) {
        case 'facebook':
          return new FacebookService(attrs, options);
        case 'twitter':
          return new TwitterService(attrs, options);
        case 'gmail':
          return new GmailService(attrs, options);
        case 'imap':
          return new ImapService(attrs, options);
        default:
          throw new Error('Unsupported service type: ' + attrs.type);
      }
    }
  });

  return Services;
});
