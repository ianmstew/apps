define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/child-views/service-item.view');

  var ServiceItemView = Marionette.ItemView.extend({
    template: template
  });

  return ServiceItemView;
});