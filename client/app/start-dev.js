define(function (require) {
  require('appstrap');
  require('lib/util/debug-radio');
  require('lib/util/debug-rsvp');
  var fakeData = require('test/util/fake-data');
  var App = require('app');

  var app = new App();

  fakeData.ensure().then(function () {
    console.log('5');
    app.start();
  });

  return app;
});
