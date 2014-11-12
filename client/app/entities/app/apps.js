define(function (require) {
  var Backbone = require('backbone');
  var AppModel = require('entities/app/app');

  var AppsCollection = Backbone.Collection.extend({

    url: '/api/apps',
    model: AppModel
  });

  return AppsCollection;
});
