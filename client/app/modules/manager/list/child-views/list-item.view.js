define(function (require) {
  var Marionette = require('marionette');
  var ServiceView = require('modules/manager/list/child-views/service.view');
  var template = require('hgn!modules/manager/list/child-views/list-item.view');

  var ListItemView = Marionette.CompositeView.extend({

    template: template,
    className: 'list-item',
    tagName: 'li',
    childView: ServiceView,
    childViewContainer: '.js-services',

    initialize: function (options) {
      this.collection = this.model.get('services');
    }
  });

  return ListItemView;
});
