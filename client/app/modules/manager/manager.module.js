define(function (require) {
  var Module = require('lib/classes/module');
  var history = require('lib/util/history');
  var ListPresenter = require('modules/manager/list/list.presenter');
  var CreatePresenter = require('modules/manager/create/create.presenter');

  var ManagerModule = Module.extend({

    channelName: 'manager',

    routes: {
      'apps': 'listApps',
      'apps/create': 'createApp'
    },

    presenters: {
      'list': ListPresenter,
      'create': CreatePresenter
    },

    channelEvents: {
      'list:apps': ['comply', 'listApps'],
      'create:app': ['comply', 'createApp']
    },

    listApps: function () {
      this.getPresenter('list').show();
      history.navigate('apps');
    },

    createApp: function () {
      this.getPresenter('create').show();
      history.navigate('apps/create');
    }
  });

  return ManagerModule;
});
