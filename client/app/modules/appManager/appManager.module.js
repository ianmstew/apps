define(function (require) {
  var Module = require('lib/classes/module'),
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
    },

    onStart: function (options) {
      this.appListManager = new AppListManager();
      this.createAppManager = new CreateAppManager();

      channels.appManager.comply('list:apps', this.listApps);
      channels.appManager.comply('create:app', this.createApp);
      channels.appManager.comply('show:view', this.showView);
    },

    onStop: function () {
      channels.appManager.stopComplying('list:apps');
      channels.appManager.stopComplying('create:app');
      channels.appManager.stopComplying('show:view');
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
