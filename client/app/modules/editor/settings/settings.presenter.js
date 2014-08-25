define(function (require) {
  var Presenter = require('lib/classes/presenter');

  var SettingsPresenter = Presenter.extend({

    show: function () {
      console.log('Settings shown here');
    }
  });

  return SettingsPresenter;
});
