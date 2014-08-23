define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appEditor/services/appService.view');

  var ServiceItem = Marionette.ItemView.extend ({
    template: template
  })

  return ServiceItem

});
