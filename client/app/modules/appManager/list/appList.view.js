define(function (require) {
  var Marionette = require('marionette'),
      ListItem = require('modules/appManager/list/appListItem.view'),
      template = require('hgn!modules/appManager/list/appList.view');

  var AppListView = Marionette.CompositeView.extend({
    template: template,
    childView: ListItem,
    childViewContainer: '.js-app-list'

    /*
    events:{
      // Need click event here for app item to lead to app detail
    },
    */
    
  });

  return AppListView;
});
