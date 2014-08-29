define(function (require) {
  var Radio = require('backbone.radio');
  var Module = require('lib/classes/module');

  var EntityModule = Module.extend({

    /*
     * Wraps fetch with a new deferred whose result is the model
     */
    fetch: function (model, options) {
      return model.fetch(options)
        .catch(function (error) {
          Radio.channel('error').trigger('fetch');
          throw error;
        });
    }
  });

  return EntityModule;
});
