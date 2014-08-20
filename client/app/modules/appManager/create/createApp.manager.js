define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      CreateAppView = require('modules/appManager/create/createApp.view');

  var CreateAppManager = Marionette.Object.extend({

    initialize: function () {
    },

    listApps: function () {
      // show view immediately
      var createView = new CreateAppView();
      channels.appManager.command('show:view', createView);
    },
  });

  return CreateAppManager;
});
