define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      OptionsCollection = require('modules/entities/options/options.collection'),
      OptionsListView = require('modules/appEditor/appEditor.view');

  var AppEditorManager = Marionette.Object.extend({

    var appEditorLayout = new AppEditorModule.Layout();

    initialize: function () {
      this.options = new OptionsCollection();
    },

    listOptions: function () {
      var listView = new OptionsListView({
        collection: this.options
      });
      channels.appEditor.command('show:view', listView);

      channels.entities.command('fetch:options');
    },

  });

  return AppEditorManager;
});
