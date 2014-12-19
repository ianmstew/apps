define(function (require) {
  var Marionette = require('marionette');
  var ServiceRowView = require('modules/editor/overview/service-rows/service-rows.view');
  var template = require('hgn!modules/editor/overview/overview.view');

  var OverviewView = Marionette.CompositeView.extend({

    template: template,
    childView: ServiceRowView,
    childViewContainer: '.js-service-rows',

    modelEvents: {
      'change': 'render'
    }
  });

  return OverviewView;
});
