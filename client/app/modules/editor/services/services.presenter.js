define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var Radio = require('backbone.radio');
  var ServicesView = require('modules/editor/services/services.view');
  var ServicesCollection = require('entities/service/services.collection');

  var ServicesPresenter = Presenter.extend({

    services: null,

    initialize: function (options) {
      _.bindAll(this, 'fetchServices', '_fetchServices', 'servicesReady');
      this.services = new ServicesCollection();
    },

    onPresent: function () {
      var appId = this.channel.request('appId');
      var servicesView = this.viewFor(ServicesView, {
        collection: this.services,
        state: {
          appId: appId
        }
      });
      this.show(servicesView);
      this.fetchServices().then(this.servicesReady);
    },

    fetchServices: function () {
      return new Promise(this._fetchServices);
    },

    _fetchServices: function (resolve, reject) {
      var appId = this.channel.request('appId');
      Radio.channel('entities').request('fetch:app', appId)
        .then(function (app) {
          resolve(app.services.toJSON());
        })
        .catch(function (error) {
          reject(error);
        });
    },

    servicesReady: function (services) {
      this.services.set(services);
    }
  });

  return ServicesPresenter;
});
