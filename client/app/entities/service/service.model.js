define(function (require) {
  var Backbone = require('backbone');

  var Service = Backbone.Model.extend({

    defaults: {
      appId: null,
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
