define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels'),
      OptionsCollection = require('modules/entities/options/options.collection'),
      OptionsListView = require('modules/appEditor/appEditor.view');

  var AppEditorManager = Marionette.Object.extend({

    initialize: function () {

      // this.appEditorLayout = new AppEditorModule.Layout();

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
      channels.appEditor.command('show:view', listView);
    },

  });

  return AppEditorManager;
});
