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

    listApps: function () {
      var listLayout = new ListLayout();
      this.show(listLayout);
    },

    createApp: function () {
      new CreatePresenter({
        region: this.getRegion(),
        present: true
      });
    }
  });

  return ManagerModule;
});
