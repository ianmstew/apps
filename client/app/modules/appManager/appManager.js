define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      history = require('lib/util/history'),
      ListManager = require('modules/appManager/list/ListManager');

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      'apps': 'listApps',
      'apps/create': 'createApp'
    }
  });

  var AppManager = Marionette.Controller.extend({

    region: null,
    router: null,
    listManager: null,

    initialize: function () {
      _.bindAll(this, 'listApps', 'createApp', 'showView');

      this.router = new Router({
        controller: this
      });

      this.listenTo(channels.appManager, 'list:apps', this.listApps);
      this.listenTo(channels.appManager, 'create:app', this.createApp);
      channels.appManager.comply('show:view', this.showView);
    },
    
    onStart: function (options) {
      this.region = options.region;
      this.listManager = new ListManager();
    },

    listApps: function () {
      this.listManager.list();
      history.navigate('apps');
    },

    createApp: function () {
      console.log('create app');
      history.navigate('apps/create');
    },

    showView: function (view) {
      this.region.show(view);
    }
  });

  return new AppManager();
});
