define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/dashboard/dashboard.view');

  var DashboardView = Marionette.ItemView.extend({
    template: template
  });

  return DashboardView;
});
