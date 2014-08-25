define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var SettingsView = require('modules/editor/settings/settings.view');

  var SettingsPresenter = Presenter.extend({

    show: function () {
      var settingsView = new SettingsView();
      this.region.show(settingsView);
    }
  });

  return SettingsPresenter;
});
