define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/overlay/overlay-loading.view');

  var OverlayLoadingView = Marionette.ItemView.extend({
    template: template
  });

  return OverlayLoadingView;
});
