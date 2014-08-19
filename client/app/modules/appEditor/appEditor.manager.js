define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      OptionsCollection = require('modules/entities/options/options.collection'),
      OptionsListView = require('modules/appEditor/appEditor.view');

  var AppEditorManager = Marionette.Object.extend({

    var appEditorLayout = new AppEditorModule.Layout();

    initialize: function () {
      this.apps = new OptionsCollection();
    },

    listOptions: function () {
      // show view immediately
      var listView = new OptionsListView({
        collection: this.apps
      });
      channels.appEditor.command('show:view', listView);

      this.listenToOnce(channels.entities, 'fetch:appOptions', this.resetApps);
      channels.entities.command('fetch:appOptions');
    },

  });

  return AppEditorManager;
});
