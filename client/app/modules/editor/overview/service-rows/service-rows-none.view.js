define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/overview/service-rows/service-rows-none.view');

  var ServiceRowsNoneView = Marionette.ItemView.extend({
    template: template,
    tagName: 'tr'
  });

  return ServiceRowsNoneView;
});
