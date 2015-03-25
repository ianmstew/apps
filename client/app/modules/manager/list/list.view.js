define(function (require) {
  var Marionette = require('marionette');
  var GridItemView = require('modules/manager/list/grid-item-view/grid-item.view');

  var ListView = Marionette.CollectionView.extend({
    childView: GridItemView,
    tagName: 'ul',
    className: 'grid'
  });

  return ListView;
});
