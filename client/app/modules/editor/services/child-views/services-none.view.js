define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/child-views/services-none.view');

  var ServicesNoneView = Marionette.ItemView.extend({
    template: template
  });

  return ServicesNoneView;
});
