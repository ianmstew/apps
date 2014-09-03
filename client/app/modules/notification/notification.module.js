define(function (require) {
  var Module = require('lib/classes/module');
  var logger = require('lib/util/logger');

  var NotificationModule = Module.extend({

    channelName: 'notification',

    channelEvents: {
      'entity:error': ['on', 'entityError']
    },

    entityError: function (entity, message) {
      console.log('here');
      logger.error(entity, message);
    }
  });

  return NotificationModule;
});
