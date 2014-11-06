define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/overview/service-rows/service-rows.view');

  var ServiceRowsView = Marionette.ItemView.extend({
    template: template,
    tagName: 'tr'
  });

  return ServiceRowsView;
});
