define(function (require) {
  require('test/util/fake-server');
  var AppModel = require('entities/app/app.model');
  var apiData = require('test/data/api-data');

  var app1 = new AppModel(apiData.apps[0]);
  var app2 = new AppModel(apiData.apps[1]);

  app1.save();
  app2.save();
});
