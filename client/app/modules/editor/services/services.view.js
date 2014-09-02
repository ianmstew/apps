define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/editor/services/child-views/service.view');
  var ServicesNoneView = require('modules/editor/services/child-views/services-none.view');
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
      'click:increment': 'incrementClicked'
    },

    appIdChanged: function (state, value) {
      this.ui.appId.text(value);
    }
  });

  return ServicesView;
});
