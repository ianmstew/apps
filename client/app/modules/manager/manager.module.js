define(function (require) {
  var Module = require('lib/classes/module');
  var ListLayout = require('modules/manager/list/list.layout');
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
      'create': CreatePresenter
    },

    listApps: function () {
      this.region.show(this.viewFor(ListLayout));
    },

    createApp: function () {
      this.getPresenter('create').present();
    }
  });

  return ManagerModule;
});
