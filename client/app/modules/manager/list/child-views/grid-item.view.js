define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/manager/list/child-views/child-views/service.view');
  var template = require('hgn!modules/manager/list/child-views/grid-item.view');

  var GridItemView = Marionette.CompositeView.extend({
    template: template,
    className: 'grid-item',
    tagName: 'li',
    childView: ServiceView,
    childViewContainer: '.js-services',

    ui: {
      'appInfo': '.js-info'
    },

    events: {
      'click @ui.appInfo': 'navigateApp'
    },

    initialize: function (options) {
      this.collection = this.model.get('services');
    },

    navigateApp: function () {
      console.log('navigate to app overview');
    }
  });

  return GridItemView;
});
