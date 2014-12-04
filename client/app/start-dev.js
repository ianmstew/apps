define(function (require, exports, module) {
  require('appstrap');
  var App = require('app');
  var Logger = require('lib/util/logger');
  var logger = require('lib/util/logger')(module);

  // Debug and development
  var testData = require('test/data/test-data');
  var debugRadio = require('lib/util/debug-radio');

  var app;

  debugRadio.enable();
  Logger.enable('debug');

  app = new App();

  testData.ensure().then(function () {
    app.start();
  }).catch(logger.error.bind(logger));

  return app;
});
