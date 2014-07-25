define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appManager/list/appListItem.view');

  var AppListItemView = Marionette.ItemView.extend({
    template: template
  });

  return AppListItemView;
});
