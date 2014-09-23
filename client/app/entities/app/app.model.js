define(function (require) {
  var Backbone = require('backbone');
  var ServicesCollection = require('entities/service/services.collection');

  var AppModel = Backbone.Model.extend({

    urlRoot: '/api/apps',
    idAttribute: '_id',

    defaults: {
      _id: null,
      name: null,
      logo: null,
      description: null,
      services: new ServicesCollection()
    },

    parse: function (data, options) {
      if (!this.get('services')) {
        data.services = new ServicesCollection(data.services);
      } else {
        this.get('services').reset(data.services);
        delete data.services;
      }
      return data;
    },

    toJSON: function () {
      var attrs = _.clone(this.attributes);
      if (attrs.services) attrs.services = _.map(attrs.services.models, _.clone);
      return attrs;
    }
  });

  return AppModel;
});
