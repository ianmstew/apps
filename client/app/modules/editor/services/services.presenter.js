define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var Radio = require('backbone.radio');
  var ServicesView = require('modules/editor/services/services.view');

  var ServicesPresenter = Presenter.extend({

    initialize: function (options) {
      _.bindAll(this, 'fetchServices', 'servicesReady');
    },

    show: function () {
      this.fetchServices.then(this.servicesReady);
    },

    fetchServices: function () {
      return new Promise(_.bind(this._fetchServices, this));
    },

    _fetchServices: function (resolve, reject) {
      Radio.channel('entities').request('fetch:app', this.appId)
        .then(function (app) {
          resolve(app.get('services'));
        })
        .catch(function () {
          reject();
        });
    },

    servicesReady: function (services) {
      var appId = this.channel.request('appId');
      var servicesView = new ServicesView({
        collection: services,
        state: {
          appId: appId
        }
      });
      this.region.show(servicesView);
    }
  });

  return ServicesPresenter;
});
