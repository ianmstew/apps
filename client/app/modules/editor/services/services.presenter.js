define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ServicesView = require('modules/editor/services/services.view');

  var ServicesPresenter = Presenter.extend({

    services: null,

    initialize: function (options) {
      _.bindAll(this, 'servicesReady');
      this.appId = options.appId;
    },

    show: function () {
      console.log('Services shown here');
      this.channel.request('fetch:services').then(this.servicesReady);
    },

    // NOTE: NOT WORKING YET (services comes back with no data) :(
    servicesReady: function (services) {
      var listView = new ServicesView({
        collection: services
      });
      this.channel.command('show:view', listView);
    }
  });

  return ServicesPresenter;
});
