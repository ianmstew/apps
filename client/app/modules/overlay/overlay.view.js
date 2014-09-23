define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/overlay/overlay.view');

  var OverlayView = Marionette.CompositeView.extend({
    template: template
  });

  return OverlayView;
});
