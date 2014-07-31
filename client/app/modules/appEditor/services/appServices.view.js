define(function (require) {
  var Marionette = require('marionette'),
      Service = require('modules/appEditor/service/appService.view'),
      template = require('hgn!modules/appEditor/service/appServices.view');

  var AppServicesView = Marionette.CompositeView.extend({
    template: template,
    childView: Service,
    childViewContainer: '.js-service'
  });

  return AppServicesView;
});
