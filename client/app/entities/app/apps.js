define(function (require) {
  var Backbone = require('backbone');
  var AppModel = require('entities/app/app');

  var Apps = Backbone.Collection.extend({

    url: '/api/apps/',
    model: AppModel
  });

  return Apps;
});
