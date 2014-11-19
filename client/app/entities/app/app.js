define(function (require) {
  var Backbone = require('backbone');
  var ServicesCollection = require('entities/service/services');

  // Maintaining consistency of sub entities requires { parse: true } option.
  // There are several different cases where this is necessary, explained below:
  // - New
  //     var model = new Model(attrs, { parse: true });
  // - Calling 'set' (no {parse:true} available)
  //     step.set(step.parse(attrs));
  // - Calling 'set' on a parent collection
  //     collection.set(array, { parse: true });
  // - Calling 'fetch'
  //     do nothing :) parse() is automatically called during a fetch
  var AppModel = Backbone.Model.extend({

    urlRoot: '/api/apps',
    idAttribute: '_id',

    services: null,

    defaults: {
      _id: null,
      clientId: null,
      clientSecret: null,
      description: null,
      logo: null,
      name: null,

      // Read only
      owner: null
    },

    constructor: function () {
      this.services = new ServicesCollection();
      AppModel.__super__.constructor.apply(this, arguments);
    },

    // Extract 'services' into sub-collection
    parse: function (data, options) {
      this.services.set(data.services, options);
      return _.omit(data, 'services');
    },

    // Re-introduce services sub-collection into JSON output
    // TODO: Remove this when no longer dependent on fake data
    toJSON: function () {
      var attrs = AppModel.__super__.toJSON.apply(this, arguments);
      _.extend(attrs, { services: _.map(this.services.models, _.clone) });
      return attrs;
    }
  });

  return AppModel;
});
