define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appEditor/services/appServiceItemView.view');

  var ServiceItemView = Marionette.ItemView.extend({
    template: template
  });

  return ServiceItemView

});
