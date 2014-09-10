define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/child-views/list-item-none.view');

  var ListItemNoneView = Marionette.ItemView.extend({
    template: template
  });

  return ListItemNoneView;
});
