define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var AppModel = require('entities/app/app.model');

  var EditorEntities = EntityModule.extend({

    channelEvents: {
      'app': ['reply', 'getApp'],
      'appId': ['reply', 'getAppId'],
      'set:appId': ['comply', 'setAppId']
    },

    app: null,
    appId: null,

    initialize: function () {
      this.app = new AppModel();
    },

    getApp: function () {
      return this.app;
    },

    getAppId: function () {
      return this.appId;
    },

    setAppId: function (appId) {
      this.appId = appId;
      this.app.set('_id', appId);
      this.fetch(this.app);
    }
  });

  return EditorEntities;
});
