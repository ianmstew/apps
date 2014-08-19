define(function (require) {
  var Marionette = require('marionette'),
      Service = require('modules/appEditor/service/appService.view'),
      template = require('hgn!modules/appEditor/service/appServices.view'),
      templateEmpty = require('hgn!modules/appEditor/service/appServicesNone.view');

  var AppServicesView = Marionette.CompositeView.extend({
    template: template,
    emptyView: AppServicesNoneView,
    childView: Service,
    childViewContainer: '.js-service'
  });

  var AppServicesNoneView = Marionette.CompositeView.extend({
    template: templateEmpty,
    childView: Service,
    childViewContainer: '.js-service'
  });

  return AppServicesView;
});
