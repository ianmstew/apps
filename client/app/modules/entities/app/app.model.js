define(function (require) {
  var Backbone = require('backbone'),
      Services = require('modules/entities/service/services.collection');

  var AppModel = Backbone.Model.extend({

    urlRoot: '/api/apps',
    idAttribute: '_id',

    defaults: {
      _id: null,
      name: null,
      logo: null,
      description: null,
      services: null
    },

    parse: function (response, options) {
      if (response.services) {
        response.services = new Services(response.services);
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
