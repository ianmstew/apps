define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appEditor/settings/appSettings.view');

  var AppSettingsView = Marionette.CompositeView.extend({
    template: template
  });

  return AppSettingsView;
});
