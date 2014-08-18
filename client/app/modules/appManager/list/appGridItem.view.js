define(function (require) {
  var Marionette = require('marionette'),
      GridItem = require('modules/appManager/list/appGridItem.view'),
      template = require('hgn!modules/appManager/list/appList.view');

  var AppGridView = Marionette.CompositeView.extend({
    template: template,
    childView: ListItem,
    childViewContainer: '.js-app-list'
  });

  return AppGridView;
});
