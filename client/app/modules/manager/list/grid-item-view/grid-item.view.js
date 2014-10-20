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

    initialize: function (options) {
      this.collection = this.model.get('services');
    }
  });

  return GridItemView;
});
