define(function (require) {
  var Marionette = require('marionette');
  var GridItemView = require('modules/manager/list/grid-item-view/grid-item.view');
  var GridItemNoneView = require('modules/manager/list/grid-item-view/grid-item-none.view');

  var ListView = Marionette.CollectionView.extend({
    emptyView: GridItemNoneView,
    childView: GridItemView
  });

  return ListView;
});
