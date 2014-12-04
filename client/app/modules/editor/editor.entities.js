define(function (require, exports, module) {
  var Module = require('lib/classes/module');
  var AppModel = require('entities/app/app');
  var notifyUtil = require('modules/notify/notify.util');
  var logger = require('lib/util/logger')(module);

  var EditorEntities = Module.extend({

    channelName: 'editor',

    channelEvents: {
      'app': ['reply', 'getApp'],
      'appId': ['reply', 'getAppId'],
      'set:appId': ['comply', 'setAppId']
    },

    initialize: function () {
      this.app = new AppModel();
      notifyUtil.handleModelErrors(this, this.app);

      this.listenTo(this.app, 'change:_id', this.onChangeAppId);
    },

    getApp: function () {
      return this.app;
    },

    getAppId: function () {
      return this.app.get('_id');
    },

    setAppId: function (appId) {
      this.app.set('_id', appId);
    },

    onChangeAppId: function (app, appId) {
      logger.debug('App id changed: ' + appId);
      this.app.fetch();
    }
  });

  return EditorEntities;
});
