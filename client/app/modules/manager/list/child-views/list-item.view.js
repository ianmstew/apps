define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/child-views/list-item.view');
  var ServiceView = require('hgn!modules/manager/list/child-views/service.view');

  var ListItemView = Marionette.ItemView.extend({
    template: template,
    className: 'js-list-item',
    tagName: 'ul',
    childView: ServiceView,
    childViewContainer: '.services'
  });

  return ListItemView;
});
