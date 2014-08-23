define(function (require) {
  var Presenter = require('lib/classes/presenter');

  var OverviewPresenter = Presenter.extend({

    initialize: function () {
    },

    resetOverview: function () {
      // reset view model, triggering re-render
    },

    show: function () {
      console.log('Overview shown here');
    }
  });

  return OverviewPresenter;
});
