define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      AppCollection = require('modules/entities/app/app.collection'),
      AppListView = require('modules/appManager/list/appList.view');

  var AppListManager = Marionette.Object.extend({

    apps: null,

    initialize: function () {
      _.bindAll(this, 'resetApps');

      this.apps = new AppCollection();
    },

    listApps: function () {
      // show view immediately
      var listView = new AppListView({
        collection: this.apps
      });
      channels.appManager.command('show:view', listView);

      // anticipate data response
      this.listenToOnce(channels.entities, 'fetch:apps', this.resetApps);
      // initiate data request
      channels.entities.command('fetch:apps');
    },

    resetApps: function (apps) {
      // reset view model, triggering re-render
      this.apps.reset(apps);
    }
  });

  return AppListManager;
});
