define(function (require) {
  var Marionette = require('marionette'),
      ListItem = require('modules/appManager/list/appListItem.view'),
      template = require('hgn!modules/appManager/list/appList.view');

  var AppListView = Marionette.CompositeView.extend({
    template: template,
    childView: ListItem,
    childViewContainer: '.js-app-list'
  });

  return AppListView;
});
