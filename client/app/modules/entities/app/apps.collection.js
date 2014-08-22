define(function (require) {
  var Backbone = require('backbone'),
      App = require('modules/entities/app/app.model');

  var Apps = Backbone.Collection.extend({

    url: '/api/apps',
    model: App
  });

  return Apps;
});
