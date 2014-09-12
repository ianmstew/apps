define(function (require) {
  var Marionette = require('marionette');
  var GridItemView = require('modules/manager/list/child-views/grid-item.view');
  var GridNoneView = require('modules/manager/list/child-views/grid-item-none.view');
  var template = require('hgn!modules/manager/list/list.view');

  var GridView = Marionette.CompositeView.extend({
    template: template,
    className: 'content-wrap',
    emptyView: GridNoneView,
    childView: GridItemView,
    childViewContainer: '.js-apps-list',

    ui: {
      'appCreate': '.apps-create'
    },

    events: {
      'click @ui.appCreate': 'createApp'
    },

    createApp: function () {
      console.log('navigate to create app');
    }
  });

  return GridView;
});
