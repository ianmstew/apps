define(function (require) {
  var Backbone = require('backbone'),
      ServiceModel = require('modules/entities/service/service.model');

  var ServiceCollection = Backbone.Collection.extend({
    
    model: ServiceModel
  });

  return ServiceCollection;  
});
