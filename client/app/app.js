define(function (require) {
  var Marionette = require('marionette');
  var history = require('lib/util/history');
  var AppModule = require('app.module');
  var ModalRegion = require('modules/modal/modal.region');
  var App = Marionette.Application.extend({

    regions: {
      contentRegion: '#content-region',
      modalRegion: ModalRegion.extend({
        el: '#modal-region'
      })
    },

    constructor: function () {
      App.__super__.constructor.apply(this, arguments);
      this.initialize();
    },

    initialize: function () {
      this.appModule = new AppModule({
        app: this
      });
      this.addInitializer(this.appModule.start.bind(this.appModule));
    },

    onStart: function () {
      history.start();

      if (history.getCurrentRoute() === '') {
        history.navigate('/apps', { trigger: true });
      }
    }
  });

  return App;
});
