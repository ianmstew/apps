define(function (require, exports, module) {
  var Backbone = require('backbone');
  var ServicesCollection = require('entities/service/services');
  var logger = require('lib/util/logger')(module);

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
  var App = Backbone.Model.extend({

    urlRoot: '/api/apps',
    idAttribute: '_id',

    services: undefined,

    defaults: {
      _id:          undefined,
      clientId:     undefined,
      clientSecret: undefined,
      description:  undefined,
      logo:         undefined,
      name:         undefined,

      // Read only
      owner:        undefined
    },

    constructor: function (attrs, options) {
      this.services = new ServicesCollection();
      App.__super__.constructor.apply(this, arguments);
    },

    initialize: function (options) {
      this.on({
        'change:_id': this.onChangeId.bind(this),
        'destroy': this.onDestroy.bind(this)
      });
    },

    onChangeId: function (app, _id) {
      logger.debug('App id changed: ' + _id);
      this.services.setAppId(_id);
      this.services.reset();
    },

    // Extract 'services' into sub-collection
    parse: function (data, options) {
      this.services.set(data.services, options);
      return _.omit(data, 'services', '__v');
    },

    onDestroy: function () {
      this.services.reset();
      this.services.stopListening();
    }
  });

  return App;
});
