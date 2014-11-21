define(function (require) {
  require('test/util/fake-server');
  var App = require('entities/app/app');
  var Apps = require('entities/app/apps');
  var apiData = require('test/data/api-data');

  var apps = new Apps();

  var fakeData = {

    ensure: function () {
      return apps.fetch()
        .then(function () {
          if (apps.isEmpty()) {
            var app1 = new App(apiData.apps[0], { parse: true });
            var app2 = new App(apiData.apps[1], { parse: true });

            return Promise.all([app1, app2, app1.save(), app2.save()]);
          } else {
            return null;
          }
        })
        .then(function (apps) {
          if (apps) {
            var app1 = apps[0];

            return Promise.all([
              app1.services.create(apiData.services[0]),
              app1.services.create(apiData.services[1])
            ]);
          }
        });
    }
  };

  return fakeData;
});
