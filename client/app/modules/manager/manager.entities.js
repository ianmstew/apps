define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var AppsCollection = require('entities/app/apps.collection');

  var EditorEntities = EntityModule.extend({

    channelEvents: {
      'apps': ['reply', 'getApps']
    },

    apps: null,

    initialize: function () {
      this.apps = new AppsCollection();
    },

    getApps: function () {
      return this.apps;
    }
  });

  return EditorEntities;
});
