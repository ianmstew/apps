define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OptionsCollection = require('modules/entities/options/options.collection');
  var OptionsListView = require('modules/editor/editor.view');

  var EditorPresenter = Presenter.extend({

    initialize: function () {

      // this.editorLayout = new AppEditorModule.Layout();

      this.options = new OptionsCollection([
        {
          name: 'Overview'
        },
        {
          name: 'Remote Services'
        },
        {
          name: 'Settings'
        }
      ]);
    },

    listOptions: function () {
      var listView = new OptionsListView({
        collection: this.options
      });
      this.channel.command('show:view', listView);
    },

  });

  return EditorPresenter;
});
