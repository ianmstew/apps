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
      appId: '#'
    },

    initialize: function () {
      HasState.mixInto(this);
    }
  });

  return ServicesView;
});
