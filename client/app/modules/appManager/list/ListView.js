define(function (require) {
  var Marionette = require('marionette'),
      ListItem = require('modules/appManager/list/ListItem'),
      template = require('hgn!modules/appManager/list/templates/ListView');

  var ListView = Marionette.CompositeView.extend({
    template: template,
    childView: ListItem,
    childViewContainer: '.js-list'
  });

  return ListView;
});
