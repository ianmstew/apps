define(function (require) {
  var Module = require('lib/classes/module');
  var ListLayout = require('modules/manager/list/list.layout');
  var CreatePresenter = require('modules/manager/create/create.presenter');
  var ManagerService = require('modules/manager/manager.service');

  var ManagerModule = Module.extend({

    // This module's Radio channel name
    channelName: 'manager',

    // This module's routes
    routes: {
      'apps/': 'listApps',
      'apps/create/': 'createApp'
    },

    // Module-level entities are provided over events through the entities sub module
    modules: {
      'entities': ManagerService
    },

    // Route 'apps'
    listApps: function () {

      // I own a region; show the List layout in it
      var listLayout = new ListLayout();
      this.channel.command('refresh:apps');
      this.show(listLayout);
    },

    // Route 'apps/create'
    createApp: function () {

      // I own a region; pass it to the Create presenter, and direct it to "present" immediately
      new CreatePresenter({
        region: this.getRegion(),
        present: true
      });
    }
  });

  return ManagerModule;
});
