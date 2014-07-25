define(function (require) {
  var Backbone = require('backbone');

  var ServiceModel = Backbone.Model.extend({

    defaults: {
      id: null,
      appId: null,
      name: null,
      icon: null,
      dateAdded: null,
      callbackUrl: null,
      clientId: null,
      clientSecret: null
    }
  });

  return ServiceModel;  
});
