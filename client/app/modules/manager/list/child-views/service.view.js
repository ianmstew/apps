define(function (require) {
  var Marionette = require('marionette');
  var ListItem = require('modules/manager/list/child-views/list-item.view');
  var template = require('hgn!modules/manager/child-views/list/list.view');

  var ListView = Marionette.CompositeView.extend({
    template: template,
    childView: ListItem,
    childViewContainer: '.js-list'
  });

  return ListView;
});
