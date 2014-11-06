define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/grid-item-view/grid-item-none-view/grid-item-none.view');

  var GridItemNoneView = Marionette.ItemView.extend({
    template: template,
    className: 'grid-item'
  });

  return GridItemNoneView;
});
