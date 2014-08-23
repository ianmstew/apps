define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/editor/services/child-views/service.view');
  var templateEmpty = require('hgn!modules/editor/services/child-views/services-none.view');

  var ServicesNoneView = Marionette.CompositeView.extend({
    template: templateEmpty,
    childView: ServiceView,
    childViewContainer: '.js-service'
  });

  return ServicesNoneView;
});
