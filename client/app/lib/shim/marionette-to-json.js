define(function (require) {
  var Marionette = require('marionette');

  Marionette.View.prototype.serializeModel = function (model) {
    model = model || this.model;
    return _.clone(model.attributes);
  };

  Marionette.ItemView.prototype.serializeCollection = function (collection) {
    return collection.map(function (model) {
      return this.serializeModel(model);
    }, this);
  };
});
