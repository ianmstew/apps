define(function (require, exports, module) {
  var Alerts = require('modules/notify/entities/alerts');
  var Alert = require('modules/notify/entities/alert');
  var AlertsView = require('modules/notify/alert/alerts.view');
  var Module = require('lib/classes/module');
  var logger = require('lib/util/logger')(module);
  var Backbone = require('backbone');

  var NotificationModule = Module.extend({

    channelName: 'notify',

    channelEvents: {
      'add:entityError': ['comply', 'addEntityError'],
      'add:userError': ['comply', 'addUserError'],
      'remove:alert': ['comply', 'removeAlert'],
      'clear:all': ['comply', 'clearAll']
    },

    onStart: function () {
      this.alerts = new Alerts();
      this.listenTo(this.alerts, {
        'add': this.onAdd
      });
      this.getRegion().show(new AlertsView({
        collection: this.alerts
      }));

      // Clear notifications on route change
      Backbone.history.on('route', this.clearAll, this);
    },

    addEntityError: function (entity, message) {
      this.alerts.add(new Alert({
        type: 'error',
        message: 'We had an issue with your request; please try again or contact support.'
      }));
      logger.error(entity, message);
    },

    addUserError: function (message, metadata) {
      this.alerts.add(new Alert({
        type: 'error',
        message: message
      }));
      logger.error(message, metadata);
    },

    removeAlert: function (alertId) {
      this.alerts.remove(alertId);
    },

    clearAll: function () {
      this.alerts.reset();
    }
  });

  return NotificationModule;
});
