define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/manager/list/child-views/service.view');
  var template = require('hgn!modules/manager/list/child-views/grid-item.view');

  var GridItemView = Marionette.CompositeView.extend({
    template: template,
    className: 'grid-item',
    tagName: 'li',
    childView: ServiceView,
    childViewContainer: '.js-services',

    ui: {
      'appInfo': '.js-info',
      'appServices': '.js-services'
    },

    events: {
      'click @ui.appInfo': 'navigateApp',
      'click @ui.appServices': 'navigateServices'
    },

    initialize: function (options) {
      this.collection = this.model.get('services');
    },

    navigateApp: function () {
      console.log('navigate to app overview');
    },

    navigateServices: function () {
      console.log('navigate to app services')
    }
  });

  return GridItemView;
});
