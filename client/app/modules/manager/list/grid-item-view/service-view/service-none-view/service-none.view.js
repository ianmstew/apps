define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/grid-item-view/service-view/service-none-view/service-none.view');

  var ServiceView = Marionette.ItemView.extend({
    template: template,
    tagName: 'li'
  });

  return ServiceView;
});
