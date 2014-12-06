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
            var app1 = new App(this.apps[0], { parse: true });
            var app2 = new App(this.apps[1], { parse: true });

            return Promise.all([app1, app2, app1.save(), app2.save()]);
          } else {
            return Promise.resolve([]);
          }
        }.bind(this))
        .then(function (apps) {
          if (apps.length) {
            var app1 = apps[0];

            return Promise.all([
              app1.services.create(this.services[0]),
              app1.services.create(this.services[1])
            ]);
          }
        }.bind(this));
    }
  };

  return testData;
});
