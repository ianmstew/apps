define(function (require) {
  require('appstrap');
  require('lib/util/debug-radio');
  require('lib/util/debug-rsvp');
  require('test/util/fake-data');
  var App = require('app');

  var app = new App();

  app.start();

  return app;
});
