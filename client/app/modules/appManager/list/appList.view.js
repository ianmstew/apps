define(function (require) {
  var Marionette = require('marionette'),
      ListItem = require('modules/appManager/list/appListItem.view'),
      template = require('hgn!modules/appManager/list/appList.view'),
      templateEmpty = require('hgn!modules/appManager/list/appListItemNone.view');

  var AppListView = Marionette.CompositeView.extend({
    template: template,
    emptyView: AppNoneView,
    childView: ListItem,
    childViewContainer: '.js-app-list'
  });

  var AppNoneView = Marionette.CompositeView.extend({
    template: templateEmpty,
    childView: ListItem,
    childViewContainer: '.js-app-list'
  });

  return AppListView;
});
