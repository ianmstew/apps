define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appManager/list/appListItem.view'),
      ServiceView = require('hgn!modules/appManager/list/service.view');

  var AppListItemView = Marionette.CompositeView.extend({
    template: template,
    className: "app-list-item",
    tagName: "ul",
    childViewContainer: ".app-services",
    childView: ServiceView
  });

  return AppListItemView;
});
