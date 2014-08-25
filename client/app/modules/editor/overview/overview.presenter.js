define(function (require) {
  var Presenter = require('lib/classes/presenter');

  var OverviewPresenter = Presenter.extend({

    show: function () {
      console.log('Overview shown here');
    }
  });

  return OverviewPresenter;
});
