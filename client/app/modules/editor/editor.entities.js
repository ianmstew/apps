define(function (require) {
  var Marionette = require('marionette');
  var Module = require('lib/classes/module');
  var AppModel = require('entities/app/app.model');
  var notifyUtil = require('modules/notify/notify.util');

  var EditorEntities = Module.extend({

    channelName: 'editor',

    channelEvents: {
      'app': ['reply', 'getApp'],
      'appId': ['reply', 'getAppId'],
      'set:appId': ['comply', 'setAppId']
    },

    appModelEvents: {
      'change:_id': '_appIdChanged'
    },

    initialize: function () {
      this.app = new AppModel();
      notifyUtil.handleModelErrors(this, this.app);
      Marionette.bindEntityEvents(this, this.app, this.appModelEvents);
    },

    getApp: function () {
      return this.app;
    },

    getAppId: function () {
      return this.app.get('_id');
    },

    setAppId: function (appId) {
      this.app.set('_id', parseInt(appId));
    },

    _appIdChanged: function () {
      this.app.get('services').reset();
      this.app.fetch();
    }
  });

  return EditorEntities;
});
