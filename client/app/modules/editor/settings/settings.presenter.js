define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var SettingsView = require('modules/editor/settings/settings.view');

  var SettingsPresenter = Presenter.extend({

    channelName: 'editor',

    onPresent: function () {
      var app = this.channel.request('app');
      var settingsView = new SettingsView({
        model: app,
        collection: app.services
      });
      this.show(settingsView);
    }
  });

  return SettingsPresenter;
});
