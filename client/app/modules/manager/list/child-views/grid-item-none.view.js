define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/child-views/grid-item-none.view');

  var GridItemNoneView = Marionette.ItemView.extend({
    template: template,
    className: 'grid-item',
    initialize: function () {
      console.log('HERE');
    }
  });

  return GridItemNoneView;
});
