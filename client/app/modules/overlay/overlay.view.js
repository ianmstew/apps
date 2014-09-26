define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/overlay/overlay.view');

  var OverlayView = Marionette.Region.extend({
    template: template
  });

  return OverlayView;
});
