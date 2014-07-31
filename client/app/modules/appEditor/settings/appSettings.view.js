define(function (require) {
  var Marionette = require('marionette');

  var appSettingsView = Marionette.view.extend({
    template: template
  });

  return appSettingsView;
});
