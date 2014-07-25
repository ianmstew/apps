define(function (require) {
  var Backbone = require('backbone'),
      AppModel = require('modules/entities/app/app.model');

  var AppCollection = Backbone.Collection.extend({
    
    model: AppModel
  });

  return AppCollection;  
});
