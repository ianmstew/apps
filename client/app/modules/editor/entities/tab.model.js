define(function (require) {
  var Backbone = require('backbone');

  var TabModel = Backbone.Model.extend({

    defaults: {
      name: null,
      title: null
    }
  });

  return TabModel;
});
