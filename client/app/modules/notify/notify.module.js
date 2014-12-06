define(function (require, exports, module) {
  var Notes = require('modules/notify/entities/notes');
  var Module = require('lib/classes/module');
  var logger = require('lib/util/logger')(module);

  var NotificationModule = Module.extend({

    channelName: 'notify',

    channelEvents: {
      'add:entityError': ['comply', 'addEntityError'],
      'add:userError': ['comply', 'addUserError'],
      'remove:note': ['comply', 'removeNote'],
      'clear:all': ['comply', 'clearAll']
    },

    initialize: function () {
      this.notes = new Notes();
      this.listenTo(this.notes, {
        'add': this.onAdd
      });
    },

    addEntityError: function (entity, message) {
      this.notes.create({
        type: 'error',
        message: 'We had an issue with your request; please try again or contact support.'
      });
      logger.error(entity, message);
    },

    addUserError: function (message, metadata) {
      this.notes.create({
        type: 'error',
        message: message
      });
      logger.error(message, metadata);
    },

    removeNote: function (noteId) {
      this.notes.remove(noteId);
    },

    clearAll: function () {
      this.notes.reset();
    }
  });

  return NotificationModule;
});
