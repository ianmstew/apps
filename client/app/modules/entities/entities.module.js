define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      UserModel = require('modules/entities/user/user.model');

  var EntitiesModule = Module.extend({

    _user: null,

    initialize: function (options) {
      _.bindAll(this,
          'fetchApps', 'fetchApp',
          'fetchServices', 'fetchService',
          /*'fetchOptions', 'fetchOption',*/
          'setUser', 'getUser');

      this._setUser((options || {}).user);

      channels.entities.comply('fetch:apps', this.fetchApps);
      channels.entities.comply('fetch:app', this.fetchApp);

      channels.entities.comply('fetch:services', this.fetchServices);
      channels.entities.comply('fetch:service', this.fetchService);

      /*
      channels.entities.comply('fetch:options', this.fetchOptions);
      channels.entities.comply('fetch:option', this.fetchOption);
      */

      channels.entities.comply('set:user', this.setUser);
      channels.entities.reply('get:user', this.getUser);
    },

    _setUser: function (user) {
      this._user = new UserModel(user);
    },

    setUser: function (user) {
      this._user.set(user);
    },

    getUser: function () {
      return this._user && this._user.toJSON();
    },

    fetchApps: function () {
      var apps = [{
        id: '100',
        name: 'App one',
        logo: 'http://placekitten.com/200/100',
        description: 'Here we have a lovely non-limited description of this app',
        services: [
          {
            id: '100',
            appId: '100',
            name: 'facebook',
            icon: 'http://placekitten.com/50/50',
            dateAdded: '10/20/2013',
            callbackUrl: 'http://callback.facebook.com',
            clientId: 'app100-facebookClientIdHash',
            clientSecret: 'app100-facebookClientSecret'
          },
          {
            id: '200',
            appId: '100',
            name: 'twitter',
            icon: 'http://placekitten.com/50/50',
            dateAdded: '04/10/2014',
            callbackUrl: 'http://callback.twitter.com',
            clientId: 'app100-twitterClientIdHash',
            clientSecret: 'app100-twitterClientSecret'
          }
        ]
      }, {
        id: '200',
        name: 'App two',
        logo: 'http://placekitten.com/200/100',
        description: 'And now we have a second description of our second app that is probably a bit longer than the first one was.',
        services: [{
          id: '100',
          appId: '200',
          name: 'facebook',
          icon: 'http://placekitten.com/50/50',
          dateAdded: '10/20/2013',
          callbackUrl: 'http://callback.facebook.com',
          clientId: 'app200-facebookClientIdHash',
          clientSecret: 'app200-facebookClientSecret'
        }, {
          id: '200',
          appId: '200',
          name: 'twitter',
          icon: 'http://placekitten.com/50/50',
          dateAdded: '04/10/2014',
          callbackUrl: 'http://callback.twitter.com',
          clientId: 'app200-twitterClientIdHash',
          clientSecret: 'app200-twitterClientSecret'
        }]
      }, {
        id: '300',
        name: 'App three',
        logo: 'http://placekitten.com/200/100',
        description: 'A third description of our app which will be considerably longer than the first and second just to allow us to test the limits of our description and how it looks on layout.',
        services: [{
          id: '100',
          appId: '200',
          name: 'facebook',
          icon: 'http://placekitten.com/50/50',
          dateAdded: '10/20/2013',
          callbackUrl: 'http://callback.facebook.com',
          clientId: 'app200-facebookClientIdHash',
          clientSecret: 'app200-facebookClientSecret'
        }, {
          id: '200',
          appId: '200',
          name: 'twitter',
          icon: 'http://placekitten.com/50/50',
          dateAdded: '04/10/2014',
          callbackUrl: 'http://callback.twitter.com',
          clientId: 'app200-twitterClientIdHash',
          clientSecret: 'app200-twitterClientSecret'
        }]
      }];

      channels.entities.trigger('fetch:apps', apps);
    },

    fetchApp: function (appId) {
      var app = {
        id: '100',
        appId: '100',
        name: 'facebook',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '10/20/2013',
        callbackUrl: 'http://hello.callback.com',
        clientId: 'myClientIdHash',
        clientSecret: 'myClientSecret'
      };

      channels.entities.trigger('fetch:app', app, appId);
    },

    fetchServices: function (appId) {
      var services = [{
        id: '100',
        appId: '100',
        name: 'facebook',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '10/20/2013',
        callbackUrl: 'http://callback.facebook.com',
        clientId: 'myFacebookClientIdHash',
        clientSecret: 'myFacebookClientSecret'
      }, {
        id: '200',
        appId: '100',
        name: 'twitter',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '04/10/2014',
        callbackUrl: 'http://callback.twitter.com',
        clientId: 'myTwitterClientIdHash',
        clientSecret: 'myTwitterClientSecret'
      }];

      channels.entities.trigger('fetch:services', services, appId);
    },

    fetchService: function (appId, serviceId) {
      var service = {
        id: '100',
        appId: '100',
        name: 'facebook',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '10/20/2013',
        callbackUrl: 'http://callback.facebook.com',
        clientId: 'myFacebookClientIdHash',
        clientSecret: 'myFacebookClientSecret'
      };

      channels.entities.trigger('fetch:service', service, appId, serviceId);
    }

    /*
    fetchOptions: function () {
      var options = [{
      }];

      channels.entities.trigger('fetch:options', options, appId);
    },

    fetchOption: function (option) {
      var option = {
      };

      channels.entities.trigger('fetch:option', option, appId );
    },
    */
  });

  return EntitiesModule;
});
