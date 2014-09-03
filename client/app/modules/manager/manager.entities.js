define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var AppsCollection = require('entities/app/apps.collection');

  var EditorEntities = EntityModule.extend({

    channelEvents: {
      'apps': ['reply', 'getApps']
    },

    entities: {
      'apps': AppsCollection
    },

    getApps: function () {
      return this.getEntity('apps');
    }
  });

  return EditorEntities;
});
