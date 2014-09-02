define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var AppModel = require('entities/app/app.model');

  var EditorEntities = EntityModule.extend({

    channelEvents: {
      'app': ['reply', 'getApp'],
      'set:appId': ['comply', 'setAppId']
    },

    app: null,
    appId: null,

    initialize: function () {
      this.app = this.entityFor(AppModel);
    },

    getApp: function () {
      return this.app;
    },

    setAppId: function (appId) {
      this.app.set('_id', appId);
    }
  });

  return EditorEntities;
});
