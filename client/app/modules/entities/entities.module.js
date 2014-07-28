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
          'setUser', 'getUser');

      this._setUser((options || {}).user);

      channels.entities.comply('fetch:apps', this.fetchApps);
      channels.entities.comply('fetch:app', this.fetchApp);

      channels.entities.comply('fetch:services', this.fetchServices);
      channels.entities.comply('fetch:service', this.fetchService);

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
        description: 'Bacon ipsum dolor sit amet culpa sirloin do ham hock pig cupidatat ut tail consequat. Cow commodo sunt frankfurter pork excepteur. Dolor eiusmod in consequat deserunt beef, cow t-bone ad shoulder. Tenderloin deserunt magna porchetta boudin consequat. Excepteur ground round drumstick dolor ball tip shoulder voluptate ad. Turducken hamburger andouille, veniam cillum flank frankfurter duis tenderloin.',
        services: [{
          id: '100',
          appId: '100',
          name: 'facebook',
          icon: 'http://placekitten.com/50/50',
          dateAdded: '10/20/2013',
          callbackUrl: 'http://callback.facebook.com',
          clientId: 'app100-facebookClientIdHash',
          clientSecret: 'app100-facebookClientSecret'
        }, {
          id: '200',
          appId: '100',
          name: 'twitter',
          icon: 'http://placekitten.com/50/50',
          dateAdded: '04/10/2014',
          callbackUrl: 'http://callback.twitter.com',
          clientId: 'app100-twitterClientIdHash',
          clientSecret: 'app100-twitterClientSecret'
        }]
      }, {
        id: '200',
        name: 'App two',
        logo: 'http://placekitten.com/200/100',
        description: 'Pancetta rump dolore, fugiat cow exercitation porchetta esse commodo quis chuck ham hock dolore drumstick ham. Fugiat ut in ball tip do anim et pork adipisicing turkey pancetta drumstick kielbasa meatloaf quis. Sirloin aute kevin shoulder ham hock ribeye turkey nisi doner exercitation shankle boudin ball tip.',
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
  });

  return EntitiesModule;
});
