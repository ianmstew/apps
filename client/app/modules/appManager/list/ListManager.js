define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      AppCollection = require('modules/entities/app/AppCollection'),
      ListView = require('modules/appManager/list/ListView');

  var ListManager = Marionette.Object.extend({

    apps: null,

    initialize: function () {
      _.bindAll(this, 'refreshApps');

      this.apps = new AppCollection();
    },

    list: function () {
      var listView = new ListView({
        collection: this.apps
      })
      this.listenToOnce(channels.entities, 'fetched:apps', this.refreshApps);
      channels.entities.command('fetch:apps');
      channels.appManager.command('show:view', listView);
    },

    refreshApps: function (apps) {
      this.apps.reset(apps);
    }
  });

  return ListManager;
});
