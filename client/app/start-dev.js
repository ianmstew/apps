define(function (require) {
  require('appstrap');
  require('test/util/debug-radio');
  require('test/util/fake-server');
  require('test/util/fake-data');
  var App = require('app');

  var app = new App();

  app.start();

  return app;
});
