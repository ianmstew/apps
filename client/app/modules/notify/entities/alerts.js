define(function (require) {
  var Backbone = require('backbone');
  var Alert = require('modules/notify/entities/alert');

  var Alerts = Backbone.Collection.extend({
    model: Alert
  });

  return Alerts;
});
