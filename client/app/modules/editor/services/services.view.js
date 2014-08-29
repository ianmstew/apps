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
      'change:appId': 'appIdChanged',
      'change:count': 'countChanged'
    },

    ui: {
      counter: 'js-counter'
    },

    events: {
      'click:increment': 'incrementClicked'
    },

    initialize: function () {
      HasState.mixinto(this);
    },

    countChanged: function (model, count) {
      this.ui.counter.innerText(count);
    },

    incrementClicked: function () {
      var count = this.state.get('count');
      this.state.set('count', count + 1);
    }
  });

  return ServicesView;
});
