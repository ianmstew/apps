define(function (require) {
  var Backbone = require('backbone');

  var UserModel = Backbone.Model.extend({

    urlRoot: '/api/users',
    idAttribute: '_id',

    defaults: {
      _id: null,
      name: null,
      avatar: null,
      email: null
    }
  });

  return UserModel;  
});
