define(function (require) {
  var Backbone = require('backbone');
  var order = 0;

  var Alert = Backbone.Model.extend({

    // Prevent models with the same message from coexisting in a collection
    idAttribute: 'message',

    sortAttribute: 'order',

    defaults: {
      order: undefined,
      type: undefined,   // {string error|warn|info}
      message: undefined
    },

    initialize: function () {
      this.set('order', --order);
    }
  });

  return Alert;
});
