define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels');
      AppServicesCollection = require('modules/entities/app/service.collection'),
      AppServicesView = require('modules/appEditor/services/appServices.view');

  var AppServicesManager = Marionette.Object.extend({

    services: null,

    initialize: function () {
      _.bindAll(this, 'resetServices');

      this.apps = new ServiceCollection();
    },

    listServices: function () {
      // show view immediately
      var listView = new ServiceListView({
        collection: this.services
      });
      channels.appEditor.command('show:view', listView);

      // anticipate data response
      this.listenToOnce(channels.entities, 'fetch:services', this.resetServices);
      // initiate data request
      channels.entities.command('fetch:services');
    },

    resetServices: function (services) {
      // reset view model, triggering re-render
      this.apps.reset(services);
    }
  });

  return AppServicesManager;
});
