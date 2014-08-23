define(function (require) {
  var Marionette = require('marionette');
  var GridItemView = require('modules/manager/list/grid-item.view');
  var template = require('hgn!modules/manager/list/list.view');

  var GridView = Marionette.CompositeView.extend({
    template: template,
    childView: GridItemView,
    childViewContainer: '.js-list'
  });

  return GridView;
});
