define(function (require) {
  var Backbone = require('backbone');
  var lastNoteId = 0;

  var Note = Backbone.Model.extend({

    defaults: {
      id: ++lastNoteId,
      type: undefined,   // {string error|warn|info}
      message: undefined
    },

    // Sort descending
    comparator: function (note) {
      return -note.get('id');
    }
  });

  return Note;
});
