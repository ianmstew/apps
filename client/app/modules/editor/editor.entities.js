define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var AppModel = require('entities/app/app.model');

  var EditorEntities = EntityModule.extend({

    channelEvents: {
      'app': ['reply', 'getApp'],
      'appId': ['reply', 'getAppId'],
      'set:appId': ['comply', 'setAppId']
    },

    entities: {
      'app': [AppModel, 'appModelEvents']
    },

    appModelEvents: {
      'change:_id': 'appIdChanged'
    },

    getApp: function () {
      return this.getEntity('app');
    },

    getAppId: function () {
      return this.getEntity('app').get('_id');
    },

    setAppId: function (appId) {
      this.getEntity('app').set('_id', parseInt(appId));
    },

    appIdChanged: function () {
      this.getEntity('app').get('services').reset();
      this.getEntity('app').fetch();
    }
  });

  return EditorEntities;
});
