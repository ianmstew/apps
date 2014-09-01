define(function (require) {
  var Backbone = require('backbone');

  var Service = Backbone.Model.extend({

    defaults: {
      name: null,
      icon: null,
      dateAdded: null,
      callbackUrl: null,
      clientId: null,
      clientSecret: null
    }
  });

  return Service;
});
