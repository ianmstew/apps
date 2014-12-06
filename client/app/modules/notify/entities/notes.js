define(function (require) {
  var Backbone = require('backbone');
  var Message = require('modules/notify/entities/message');

  var Messages = Backbone.Collection.extend({
    model: Message
  });

  return Messages;
});
