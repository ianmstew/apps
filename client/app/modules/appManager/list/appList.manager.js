define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      AppListView = require('modules/appManager/list/appList.view');

  var AppListManager = Marionette.Object.extend({

    apps: null,

    initialize: function () {
      this.apps = channels.entities.request('apps');
    },

    listApps: function () {
      // show view immediately
      var listView = new AppListView({
        collection: this.apps
      });
      channels.appManager.command('show:view', listView);

      this.apps.fetch();
    }
  });

  return AppListManager;
});
