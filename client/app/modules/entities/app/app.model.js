define(function (require) {
  var Backbone = require('backbone');
  var ServicesCollection = require('modules/entities/service/services.collection');

  var AppModel = Backbone.Model.extend({

    urlRoot: '/api/apps',
    idAttribute: '_id',

    defaults: {
      _id: null,
      name: null,
      logo: null,
      description: null,
      services: []
    },

    parse: function (response, options) {
      // if (response.services) {
      //   if (this.services) {
      //     // Keep the child collection intact if it exists
      //     this.services.reset(response.services);
      //     delete response.services;
      //   } else {
      //     // Create a new child collection if not
      //     
      //   }
      // }
      if (response.services) {
        response.services = new ServicesCollection(response.services);
      }
      return response;
    },

    toJSON: function () {
      var attributes = _.clone(this.attributes);
      attributes.services = _.map((attributes.services || {}).models, _.clone);
      return attributes;
    }
  });

  return AppModel;
});
