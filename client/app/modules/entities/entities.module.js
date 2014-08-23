define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var User = require('modules/entities/user/user.model');
  var AppModel = require('modules/entities/app/app.model');
  var AppsCollection = require('modules/entities/app/apps.collection');

  var EntitiesModule = EntityModule.extend({

    channelName: 'entities',

    apps: null,
    user: null,

    initialize: function () {
      _.bindAll(this, 'fetchApps', 'fetchApp', 'fetchUser');
    },

    onStart: function () {
      this.channel.reply('fetch:apps', this.fetchApps);
      this.channel.reply('fetch:app', this.fetchApp);
      this.channel.reply('fetch:user', this.fetchUser);
    },

    onStop: function () {
      this.channel.stopReplying('fetch:apps');
      this.channel.stopReplying('fetch:app');
      this.channel.stopReplying('fetch:user');
    },

    fetchUser: function () {
      var user = new User();
      return this.fetch(user, { url: '/api/users/current' });
    },

    fetchApps: function () {
      var apps = new AppsCollection();
      return this.fetch(apps);
    },

    fetchApp: function (appId) {
      var app = new AppModel({
        _id: appId
      });
      return this.fetch(app);
    }
  });

  return EntitiesModule;
});
