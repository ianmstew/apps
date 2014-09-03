define(function (require) {
  var Module = require('lib/classes/module');
  var ListPresenter = require('modules/manager/list/list.presenter');
  var CreatePresenter = require('modules/manager/create/create.presenter');
  var ManagerEntities = require('modules/manager/manager.entities');

  var ManagerModule = Module.extend({

    channelName: 'manager',

    routes: {
      'apps': 'listApps',
      'apps/create': 'createApp'
    },

    modules: {
      'entities': ManagerEntities
    },

    presenters: {
      'list': ListPresenter,
      'create': CreatePresenter
    },

    listApps: function () {
      this.getPresenter('list').present();
    },

    createApp: function () {
      this.getPresenter('create').present();
    }
  });

  return ManagerModule;
});
