define(function (require) {
  require('appstrap');
  var App = require('app');
  var Logger = require('lib/util/logger');
  var app;

  Logger.enable('error');
  app = new App();
  app.start();

  return app;
});
