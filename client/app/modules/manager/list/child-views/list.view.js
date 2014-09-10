define(function (require) {
  var Marionette = require('marionette');
  var GridItemView = require('modules/manager/list/child-views/grid-item.view');
  var GridItemNoneView = require('modules/manager/list/child-views/grid-item-none.view');

  var GridView = Marionette.CollectionView.extend({
    emptyView: GridItemNoneView,
    childView: GridItemView,
    tagName: 'ul',
    className: 'clearfix'
  });

  return GridView;
});
