define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history'),
      AppListManager = require('modules/appManager/list/appList.manager'),
      CreateAppManager = require('modules/appManager/create/createApp.manager');

  var AppManagerModule = Module.extend({

    routes: {
      'apps': 'listApps',
      'apps/create': 'createApp'
    },

    appListManager: null,
    createAppManager: null,

    initialize: function () {
      _.bindAll(this, 'listApps', 'createApp', 'showView');

      this.listenTo(channels.appManager, 'list:apps', this.listApps);
      this.listenTo(channels.appManager, 'create:app', this.createApp);

      channels.appManager.comply('show:view', this.showView);
    },

    onStart: function (options) {
      this.appListManager = new AppListManager();
      this.createAppManager = new CreateAppManager();
    },

    listApps: function () {
      this.appListManager.listApps();
      history.navigate('apps');
    },

    createApp: function () {
      console.log('creating app here!');
      this.createAppManager.createApp();
      history.navigate('apps/create');
    },

    showView: function (view) {
      this.getRegion().show(view);
    }
  });

  return AppManagerModule;
});
