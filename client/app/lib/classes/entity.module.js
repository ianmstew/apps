define(function (require) {
  var Radio = require('backbone.radio');
  var Module = require('lib/classes/module');

  var EntityModule = Module.extend({

    // Creates a new instance that broadcasts errors on the error channel
    entityFor: function (Entity, attributes, options) {
      var entity = new Entity(attributes, options);
      this.listenTo(entity, 'error', this._modelError);
      return entity;
    },

    _modelError: function (model, resp, options) {
      Radio.channel('notification').trigger('entity:error', model, resp.statusText);
    }
  });

  return EntityModule;
});
