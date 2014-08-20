define(function (require) {
  var Backbone = require('backbone');

  var OptionsModel = Backbone.Model.extend({

    defaults: {
      name: null
    }
  });

  return OptionsModel;
});
