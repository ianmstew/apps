define(function (require) {
  var Module = require('lib/classes/module');
  var history = require('lib/util/history');
  var ListPresenter = require('modules/manager/list/list.presenter');
  var CreatePresenter = require('modules/manager/create/create.presenter');

  var ManagerModule = Module.extend({

    routes: {
      'apps': 'listApps',
      'apps/create': 'createApp'
    },

    presenters: {
      'list': ListPresenter,
      'create': CreatePresenter
    },

    channelName: 'manager',

    channelEvents: {
      'list:apps': ['comply', 'listApps'],
      'create:app': ['comply', 'createApp'],
      'show:view': ['comply', 'showView']
    },

    listPresenter: null,
    createPresenter: null,

    initialize: function () {
      _.bindAll(this, 'listApps', 'createApp', 'showView');
    },

    onStart: function (options) {
      this.complyWith(this.channel, 'list:apps', this.listApps);
      this.complyWith(this.channel, 'create:app', this.createApp);
      this.complyWith(this.channel, 'show:view', this.showView);
    },

    listApps: function () {
      this.getPresenter('list').show();
      history.navigate('apps');
    },

    createApp: function () {
      console.log('creating app here!');
      this.getPresenter('create').show();
      history.navigate('apps/create');
    },

    showView: function (view) {
      this.region.show(view);
    }
  });

  return ManagerModule;
});
