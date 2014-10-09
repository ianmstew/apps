define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/grid-item-view/grid-item-loading.view');

  var GridItemLoadingView = Marionette.ItemView.extend({
    template: template,
    className: 'grid-item'
  });

  return GridItemLoadingView;
});
