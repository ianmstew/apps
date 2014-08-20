define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appEditor/settings/appSettings.view');

  var appSettingsView = Marionette.view.extend({
    template: template,
    itemView: Settings,
    itemViewContainer: '.js-app-settings'
  });

  return appSettingsView;
});
