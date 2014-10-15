define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/editor/services/service-view/service.view');
  var ServicesNoneView = require('modules/editor/services/services-none.view');
  // var ModalRegion = require('modules/modal/modal.view');
  var ModalView = require('modules/modal/modal.view');
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
      serviceCreate: '.js-service-create',
      serviceInfo: '.service-info'
    },

    events: {
      'click @ui.serviceCreate': 'addService',
      'click @ui.serviceInfo': 'editService'
    },

    appIdChanged: function (state, value) {
      this.ui.appId.text(value);
    },

    addService: function () {
      console.log('Add Service Overlay triggered');
    },

    editService: function () {
      // console.log('I trigger service overlay!');

      var modal = new ModalRegion({
        el:'#modal-region'
      });

      var modalView = new ModalView();
      modal.show(modalView);
    }
  });

  return ServicesView;
});
