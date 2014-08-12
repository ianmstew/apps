define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appManager/list/appListItem.view');

  var AppListItemView = Marionette.ItemView.extend({
    template: template,
    className: "app-list-item",
    tagName: "ul"
  });

  return AppListItemView;
});
