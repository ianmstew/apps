define(function (require) {
  var Backbone = require('backbone');

  var UserModel = Backbone.Model.extend({

    defaults: {
      id: null,
      name: null,
      avatar: null,
      email: null
    }
  });

  return UserModel;  
});
