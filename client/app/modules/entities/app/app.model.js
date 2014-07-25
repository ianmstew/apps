define(function (require) {
  var Backbone = require('backbone');

  var AppModel = Backbone.Model.extend({

    defaults: {
      id: null,
      name: null,
      logo: null,
      description: null,
      services: null
    },

    parse: function (response, options) {
      if (response.services) {
        response.services = new PermissionCollection(response.services);
      }
      return response;
    },
   
    toJSON: function () {
      var attributes = _.clone(this.attributes);
      attributes.services = _.map(attributes.services.models, _.clone);
      return attributes;
    }
  });

  return AppModel;  
});
