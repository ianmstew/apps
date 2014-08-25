define(function (require) {
  var Marionette = require('marionette');
  var TabView = require('modules/editor/child-views/tab.view');

  var TabsView = Marionette.CollectionView.extend({

    childView: TabView,
    tagName: 'ul'
  });

  return TabsView;
});
