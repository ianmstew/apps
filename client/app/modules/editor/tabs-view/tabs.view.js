define(function (require) {
  var Marionette = require('marionette');
  var TabView = require('modules/editor/tabs-view/tab-view/tab.view');

  var TabsView = Marionette.CollectionView.extend({

    childView: TabView,
    tagName: 'ul',
    className: 'nav nav-tabs'
  });

  return TabsView;
});
