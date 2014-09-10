define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var AppsCollection = require('entities/app/apps.collection');

  var EditorEntities = EntityModule.extend({

    channelName: 'manager',

    channelEvents: {
      'apps': ['reply', 'getApps']
    },

    apps: null,

    initialize: function () {
      this.apps = this.entityFor(AppsCollection);
    },

    getApps: function () {
      this.apps.fetch();
      return this.apps;
    }
  });

  return EditorEntities;
});
