define(function (require) {
  var Backbone = require('backbone');
  var Service = require('entities/service/service.model');

  var Services = Backbone.Collection.extend({

    model: Service
  });

  return Services;
});
