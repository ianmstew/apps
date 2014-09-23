define(function (require) {
  var Module = require('lib/classes/module');
  var AppsCollection = require('entities/app/apps.collection');
  var notifyUtil = require('modules/notify/notify.util');

  var EditorEntities = Module.extend({

    channelName: 'manager',

    channelEvents: {
      'apps': ['reply', 'getApps']
    },

    apps: null,

    initialize: function () {
      this.apps = new AppsCollection();
      notifyUtil.handleModelErrors(this, this.apps);
    },

    getApps: function () {
      this.apps.fetch();
      return this.apps;
    }
  });

  return EditorEntities;
});
