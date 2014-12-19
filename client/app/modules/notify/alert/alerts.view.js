define(function (require) {
  var Marionette = require('marionette');
  var AlertView = require('modules/notify/alert/alert.view');

  var AlertsView = Marionette.CollectionView.extend({
    childView: AlertView
  });

  return AlertsView;
});
