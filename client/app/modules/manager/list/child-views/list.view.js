define(function () {
  var Marionette = require('marionette');
  var ListItemView = require('modules/manager/list/child-views/list-item.view');
  var ListNoneView = require('modules/manager/list/child-views/list-item-none.view');

  var ListView = Marionette.CollectionView.extend({
    emptyView: ListNoneView,
    childView: ListItemView
  });

  return ListView;
});
