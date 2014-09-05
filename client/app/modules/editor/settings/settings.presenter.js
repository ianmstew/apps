define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var SettingsView = require('modules/editor/settings/settings.view');

  var SettingsPresenter = Presenter.extend({

    onPresent: function () {
      var settingsView = new SettingsView();
      this.show(settingsView);
    }
  });

  return SettingsPresenter;
});
