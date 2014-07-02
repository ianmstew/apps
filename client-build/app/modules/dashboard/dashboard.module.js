define(function (require) {
  var Module = require('lib/module/module'),
      DashboardController = require('modules/dashboard/dashboard.controller');

  var DashboardModule = Module.extend({
    moduleControllerClass: DashboardController
  });

  var dashboard = require('app').module('dashboard', DashboardModule);
  return dashboard;
});
