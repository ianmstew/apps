define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appManager/list/templates/ListItem');

  var ListView = Marionette.ItemView.extend({
    template: template
  });

  return ListView;
});
