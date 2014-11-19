define(function (require) {
  var Marionette = require('marionette');
  var ServiceNoneView = require('modules/manager/list/grid-item-view/service-view/service-none-view/service-none.view');
  var ServiceView = require('modules/manager/list/grid-item-view/service-view/service.view');
  var template = require('hgn!modules/manager/list/grid-item-view/grid-item.view');

  var GridItemView = Marionette.CompositeView.extend({
    template: template,
    className: 'grid-item',
    tagName: 'li',
    emptyView: ServiceNoneView,
    childView: ServiceView,
    childViewContainer: '.js-services',

    initialize: function (options) {
      this.collection = this.model.services;
    }
  });

  return GridItemView;
});
