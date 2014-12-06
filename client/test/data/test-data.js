define(function (require) {
  var App = require('entities/app/app');
  var Apps = require('entities/app/apps');
  var apps = new Apps();

  var testData = {

    apps: [{
      name: 'App one',
      description: 'Bacon ipsum dolor sit amet culpa sirloin do ham hock pig cupidatat ut tail'
        + 'consequat. Cow commodo sunt frankfurter pork excepteur.'
    }, {
      name: 'App two',
      description: 'Pancetta rump dolore, fugiat cow exercitation porchetta esse commodo quis '
        + 'chuck ham hock dolore drumstick ham.',
      services: []
    }],

    services: [{
      type: 'facebook',
      connectionData: {
        clientID: 'app1-facebookClientId',
        clientSecret: 'app1-facebookClientSecret'
      }
    }, {
      type: 'twitter',
      connectionData: {
        consumerKey: 'app1-twitterClientId',
        consumerSecret: 'app1-twitterClientSecret'
      }
    }],

    ensure: function () {
      return apps.fetch()
        .then(function () {
          if (apps.isEmpty()) {
            var app1 = new App(testData.apps[0], { parse: true });
            var app2 = new App(testData.apps[1], { parse: true });

            return Promise.all([app1, app2, app1.save(), app2.save()]);
          } else {
            return [];
          }
        })
        .then(function (apps) {
          if (apps.length) {
            var app1 = apps[0];
            var service1 = app1.services.create(testData.services[0]);
            var service2 = app1.services.create(testData.services[1]);
            return Promise.all([service1.syncing, service2.syncing]);
          }
        });
    }
  };

  return testData;
});
