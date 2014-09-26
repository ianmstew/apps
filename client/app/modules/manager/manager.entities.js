define(function (require) {
  var Module = require('lib/classes/module');
  var AppsCollection = require('entities/app/apps.collection');
  var notifyUtil = require('modules/notify/notify.util');

  var EditorEntities = Module.extend({

    // Same as this.channel = Backbone.Radio.channel('manager')
    channelName: 'manager',

    // Same as this.channel.reply('apps', this.getApps.bind(this))
    // See Backbone.Radio documentation
    channelEvents: {
      'apps': ['reply', 'getApps']
    },

    // The shared Apps collection
    apps: null,

    // This module has a single, shared Apps collection, which is why it is only
    // instantiated here, once.
    initialize: function () {
      this.apps = new AppsCollection();
      notifyUtil.handleModelErrors(this, this.apps);
    },

    // Anyone can ask for the shared Apps collection.
    // When they do, fetch() is called to ensure the data is up to date.
    getApps: function () {
      this.apps.fetch();
      return this.apps;
    }
  });

  return EditorEntities;
});
