define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var TabsCollection = require('modules/editor/entities/tabs.collection');
  var EditorView = require('modules/editor/editor.view');

  var EditorPresenter = Presenter.extend({

    initialize: function () {
      this.tabs = new TabsCollection([{
        name: 'Overview'
      }, {
        name: 'Remote Services'
      }, {
        name: 'Settings'
      }]);
    },

    show: function () {
      this.listView = new EditorView({
        collection: this.tabs
      });
      this.region.show(this.listView);
    }
  });

  return EditorPresenter;
});
