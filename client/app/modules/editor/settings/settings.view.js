define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/settings/settings.view');

  var SettingsView = Marionette.ItemView.extend({
    template: template
  });

  return SettingsView;
});
