define(function (require) {
  var ModuleController = require('lib/module/module.controller'),
      history = require('lib/util/history'),
      DashboardView = require('modules/dashboard/dashboard.view');

  var DashboardController = ModuleController.extend({

    routes: {
      'dashboard': 'showDashboard'
    },

    globalEvents: {
      vent: {
        'show:dashboard': 'showDashboard'
      }
    },

    showDashboard: function () {
      var view = new DashboardView();
      this.mainRegion.show(view);
      history.navigate('dashboard');
    }
  });

  return DashboardController;
});
