define(function (require) {
  var Backbone = require('backbone');
  var Note = require('modules/notify/entities/note');

  var Notes = Backbone.Collection.extend({
    model: Note
  });

  return Notes;
});
