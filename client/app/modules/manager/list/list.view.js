define(function (require) {
  var Marionette = require('marionette');
  var GridItemView = require('modules/manager/list/child-views/grid-item.view');
  var GridItemNoneView = require('modules/manager/list/child-views/grid-item-none.view');

  var ListView = Marionette.CollectionView.extend({
    emptyView: GridItemNoneView,
    childView: GridItemView,
    tagName: 'div',
    className: 'this-is-a-class'
  });

  return ListView;
});