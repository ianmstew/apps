define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appManager/list/appListItem.view'),
      ServiceView = require('hgn!modules/appManager/list/service.view');

  var AppListItemView = Marionette.ItemView.extend({
    template: template,
    className: "app-list-item",
    tagName: "ul",
    childView: ServiceView,
    childViewContainer: ".app-services"
  });

  return AppListItemView;
});
