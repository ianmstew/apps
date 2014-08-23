define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/editor/services/child-views/service.view');
  var ServicesNoneView = require('modules/editor/services/child-views/services-none.view');
  var template = require('hgn!modules/editor/services/services.view');

  var ServicesView = Marionette.CompositeView.extend({
    template: template,
    emptyView: ServicesNoneView,
    childView: ServiceView,
    childViewContainer: '.js-service'
  });

  return ServicesView;
});
