define(function (require) {
  var Marionette = require('marionette');
  var ListItemView = require('modules/manager/list/child-views/list-item.view');
  var template = require('hgn!modules/manager/list/child-views/list-item-none.view');

  var ListItemNoneView = Marionette.CompositeView.extend({
    template: template,
    childView: ListItemView,
    childViewContainer: '.js-list'
  });

  return ListItemNoneView;
});
