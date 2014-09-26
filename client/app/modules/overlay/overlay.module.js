define(function (require) {
  var Module = require('lib/classes/module');
  var OverlayPresenter = require('modules/overlay/overlay.presenter');

  var OverlayModule = Module.extend({

    channelName: 'overlay',

    presenters: {
      'overlay': OverlayPresenter
    },

    channelEvents: {
      'show:overlay': ['comply', 'showOverlay']
    },

    initialize: function () {
    },

    onStart: function () {
      console.log('Overlay starts!');
    },

    showOverlay: function (view, options) {
      var opts = _.extend({}, options, { view: view });
      this.getPresenter('overlay').present(opts);
    }
  });

  return OverlayModule;
});
