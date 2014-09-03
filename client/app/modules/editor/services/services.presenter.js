define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ServicesView = require('modules/editor/services/services.view');

  var ServicesPresenter = Presenter.extend({

    onPresent: function () {
      var app = this.channel.request('app');
      var servicesView = this.viewFor(ServicesView, {
        model: app,
        collection: app.get('services')
      });
      this.show(servicesView);
    }
  });

  return ServicesPresenter;
});
