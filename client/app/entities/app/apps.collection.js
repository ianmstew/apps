define(function (require) {
  var Backbone = require('backbone');
  var AppModel = require('entities/app/app.model');

  var AppsCollection = Backbone.Collection.extend({

    url: '/api/apps',
    model: AppModel
  });

  return AppsCollection;
});
