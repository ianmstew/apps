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
      appId: '.js-services-appId'
    },

    events: {
      'click .js-service-create': 'addService',
      'click .service-info': 'editService'
    },

    appIdChanged: function (state, value) {
      this.ui.appId.text(value);
    },

    addService: function () {
      console.log('Add Service Overlay triggered');
    },

    editService: function () {
      console.log('I will trigger service edit overlay');
    }
  });

  return ServicesView;
});
