define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/editor/services/service-view/service.view');
  var ServicesNoneView = require('modules/editor/services/services-none.view');
  var template = require('hgn!modules/editor/services/services.view');

  var ServicesView = Marionette.CompositeView.extend({

    template: template,
    emptyView: ServicesNoneView,
    childView: ServiceView,
    childViewContainer: '.js-service',

    modelEvents: {
      'change:_id': 'appIdChanged'
    },

    ui: {
      appId: '.js-services-appId',
      'serviceCreate': '.js-service-create'
    },

    events: {
      'click @ui.serviceCreate': 'addService'
    },

    appIdChanged: function (state, value) {
      this.ui.appId.text(value);
    },

    addService: function () {
      console.log('Add Service Overlay triggered');
    }
  });

  return ServicesView;
});
