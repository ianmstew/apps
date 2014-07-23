define(function (require) {
  var Backbone = require('backbone');

  var AppModel = Backbone.Model.extend({
    model: AppModel,

    defaults: {
      name: null
    }
  });

  return AppModel;  
});
