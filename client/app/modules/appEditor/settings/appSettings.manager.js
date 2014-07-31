define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels');
      //

  var AppOverviewManager = Marionette.Object.extend({

    initialize: function () {
    },

    resetOverview: function () {
      // reset view model, triggering re-render
    }
  });

  return AppOverviewManager;
});
