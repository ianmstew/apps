define(function (require) {
  var App = require('modules/entities/app/app.model'),
      apiData = require('test/data/api-data');

  var app1 = new App();
  var app2 = new App();

  app1.set(app1.parse(apiData.apps[0]));
  app2.set(app2.parse(apiData.apps[1]));

  app1.save();
  app2.save();
});
