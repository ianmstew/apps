define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/editor/services/service-view/service.view');
  var ServicesNoneView = require('modules/editor/services/services-none.view');
  var ServiceAddView = require('modules/editor/services/service-add-view/service-add.view');
  var template = require('hgn!modules/editor/services/services.view');
  var Radio = require('backbone.radio');

  var ServicesView = Marionette.CompositeView.extend({

    template: template,
    emptyView: ServicesNoneView,
    childView: ServiceView,
    childViewContainer: '.js-service',

    className: 'services',

    modelEvents: {
      'change:_id': 'appIdChanged'
    },

    ui: {
      appId: '.js-services-appId',
      serviceCreate: '.js-grid-create'
    },

    events: {
      'click @ui.serviceCreate': 'onClickServiceCreate'
    },

    appIdChanged: function (state, value) {
      this.ui.appId.text(value);
    },

    onClickServiceCreate: function () {
      var modalView = new ServiceAddView({
        model: this.model
      });
      Radio.command('modal', 'show:modal', modalView, {
        title: 'Add Service',
        subtitle: 'Select a service to add:'
      });
    }
  });

  return ServicesView;
});
