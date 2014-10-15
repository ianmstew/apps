define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/manager/list/grid-item-view/service-view/service.view');
  var template = require('hgn!modules/manager/list/grid-item-view/grid-item.view');

  var GridItemView = Marionette.CompositeView.extend({
    template: template,
    className: 'grid-item',
    tagName: 'li',
    childView: ServiceView,
    childViewContainer: '.js-services',

    ui: {
      jsAppInfo: '.app-info'
    },

    initialize: function (options) {
      this.collection = this.model.get('services');
    },

    events: {
      'click @ui.jsAppInfo': 'showAppInfo'
    },

    showAppInfo: function () {
      console.log('I will navigate to the app info');
    }
  });

  return GridItemView;
});
