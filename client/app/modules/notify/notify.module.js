define(function (require, exports, module) {
  var Module = require('lib/classes/module');
  var logger = require('lib/util/logger')(module);

  var NotificationModule = Module.extend({

    channelName: 'notify',

    channelEvents: {
      'entity:error': ['on', 'entityError']
    },

    entityError: function (entity, message) {
      logger.error(entity, message);
    }
  });

  return NotificationModule;
});
