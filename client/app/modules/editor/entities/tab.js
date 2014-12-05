define(function (require) {
  var Backbone = require('backbone');

  var TabModel = Backbone.Model.extend({

    defaults: {
      name: undefined,
      title: null
    }
  });

  return TabModel;
});
