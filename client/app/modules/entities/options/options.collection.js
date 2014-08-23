define(function (require) {
  var Backbone = require('backbone');
  var OptionsModel = require('modules/entities/options/options.model');

  var OptionsCollection = Backbone.Collection.extend({

    model: OptionsModel
  });

  return OptionsCollection;
});
