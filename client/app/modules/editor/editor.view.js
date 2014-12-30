define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/editor.view');
  var TabsCollection = require('modules/editor/entities/tabs');
  var TabsView = require('modules/editor/tabs-view/tabs.view');

  var EditorView = Marionette.LayoutView.extend({

    template: template,

    regions: {
      tabs: '.js-editor-tabs',
      content: '.js-editor-content'
    },

    initialize: function () {
      this.tabs = new TabsCollection([{
        name: 'overview',
        title: 'Overview'
      }, {
        name: 'services',
        title: 'Remote Services'
      }, {
        name: 'settings',
        title: 'Settings'
      }]);
    },

    onBeforeShow: function () {
      var tabsView = new TabsView({
        collection: this.tabs
      });
      this.getRegion('tabs').show(tabsView);
    }
  });

  return EditorView;
});
