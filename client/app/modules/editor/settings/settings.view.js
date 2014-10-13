define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/settings/settings.view');

  var SettingsView = Marionette.ItemView.extend({
    template: template,

    events: {
      'click .js-delete-app': 'deleteApplication'
    },

    deleteApplication: function () {
      console.log('I will trigger alert overlay to confirm deletion of app');
    }
  });

  return SettingsView;
});
