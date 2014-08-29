define(function (require) {
  var Marionette = require('marionette');
  var ListItemView = require('modules/manager/list/child-views/list-item.view');
  var ListNoneView = require('modules/manager/list/child-views/list-item-none.view');
  var template = require('hgn!modules/manager/list/list.view');

  var ListView = Marionette.CompositeView.extend({
    template: template,
    emptyView: ListNoneView,
    childView: ListItemView,
    childViewContainer: '.js-apps-list'
  });

  return ListView;
});
