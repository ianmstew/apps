define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history'),
      AppListManager = require('modules/appManager/list/appList.manager');

  var AppManagerModule = Module.extend({

    routes: {
      'apps': 'listApps',
      'apps/create': 'createApp'
    },

    appListManager: null,

    initialize: function () {
      _.bindAll(this, 'listApps', 'createApp', 'showView');

      this.listenTo(channels.appManager, 'list:apps', this.listApps);
      this.listenTo(channels.appManager, 'create:app', this.createApp);
      channels.appManager.comply('show:view', this.showView);
    },

    onStart: function (options) {
      this.appListManager = new AppListManager();
    },

    listApps: function () {
      this.appListManager.listApps();
      history.navigate('apps');
    },

    createApp: function () {
      console.log('create app');
      history.navigate('apps/create');
    },

    showView: function (view) {
      this.getRegion().show(view);
    }
  });

  return AppManagerModule;
});
