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

    parse: function (data, options) {
      if (_.isArray(data.services)) {
        data.services = new ServicesCollection(data.services);
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
