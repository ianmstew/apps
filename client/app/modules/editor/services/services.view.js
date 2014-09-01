define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/editor/services/child-views/service.view');
  var ServicesNoneView = require('modules/editor/services/child-views/services-none.view');
  var template = require('hgn!modules/editor/services/services.view');
  var HasState = require('lib/mixin/has-state');

  var ServicesView = Marionette.CompositeView.extend({
    template: template,
    emptyView: ServicesNoneView,
    childView: ServiceView,
    childViewContainer: '.js-service',

    defaultState: {
      appId: '#',
      counter: 0
    },

    stateEvents: {
      'change:appId': 'appIdChanged'
    },

    ui: {
      appId: '.js-services-appId'
    },

    events: {
      'click:increment': 'incrementClicked'
    },

    initialize: function () {
      HasState.augment(this);
    },

    appIdChanged: function (state, value) {
      this.ui.appId.text(value);
    }
  });

  return ServicesView;
});
