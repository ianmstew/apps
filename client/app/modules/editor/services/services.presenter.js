define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ServicesView = require('modules/editor/services/services.view');

  var ServicesPresenter = Presenter.extend({

    channelName: 'editor',

    onPresent: function () {
      var app = this.channel.request('app');
      var servicesView = new ServicesView({
        model: app,
        collection: app.services
      });
      this.show(servicesView, { loading: true });
    }
  });

  return ServicesPresenter;
});
