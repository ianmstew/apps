define(function (require) {
  var Backbone = require('backbone'),
      Module = require('lib/classes/module'),
      channels = require('channels'),
      logger = require('lib/util/logger');

  var EntityModule = Module.extend({

    constructor: function () {
      EntityModule.__super__.constructor.apply(this, arguments);
    },

    /*
     * Wraps fetch with a new deferred whose result is the model
     */
    fetch: function (model, options) {
      if (!(model instanceof Backbone.Model) &&
          !(model instanceof Backbone.Collection)) {
        logger.warn('model is not initialized');
      }

      return model.fetch(options)
        .then(function (data) {
          return model;
        })
        .catch(function (error) {
          channels.error.trigger('fetch');
          throw error;
        });
    }
  });

  return EntityModule;
});
