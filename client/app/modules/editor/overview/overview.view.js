define(function (require) {
  var Marionette = require('marionette');
  var ServiceNoneView = require('modules/editor/overview/service-rows/service-rows-none.view');
  var ServiceRowView = require('modules/editor/overview/service-rows/service-rows.view');
  var template = require('hgn!modules/editor/overview/overview.view');

  var OverviewView = Marionette.CompositeView.extend({

    template: template,
    emptyView: ServiceNoneView,
    childView: ServiceRowView,
    childViewContainer: '.js-service-rows',

    modelEvents: {
      'change': 'render'
    },

    initialize: function () {
      this.childViewOptions = {
        app: this.model
      };
    }
  });

  return OverviewView;
});
