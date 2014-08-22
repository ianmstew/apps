define(function (require) {
  var EntityModule = require('lib/classes/entity.module'),
      channels = require('channels'),
      User = require('modules/entities/user/user.model'),
      App = require('modules/entities/app/app.model'),
      Apps = require('modules/entities/app/apps.collection');

  var EntitiesModule = EntityModule.extend({

    apps: null,
    user: null,

    initialize: function () {
      _.bindAll(this, 'getApps', 'getApp', 'getUser');
      this.apps = new Apps();
      this.user = new User();
    },

    onStart: function () {
      channels.entities.reply('apps', this.getApps);
      channels.entities.reply('app', this.getApp);
      channels.entities.reply('user', this.getUser);
    },

    onStop: function () {
      channels.entities.stopReplying('apps');
      channels.entities.stopReplying('app');
      channels.entities.stopReplying('user');
    },

    getUser: function (options) {
      return (options || {}).fetch
        ? this.fetch(this.user, { url: '/api/users/current' })
        : this.user;
    },

    getApps: function (options) {
      return (options || {}).fetch
        ? this.fetch(this.apps)
        : this.apps;
    },

    getApp: function (appId, options) {
      var app = new App(appId);
      return (options || {}).fetch
        ? this.fetch(app)
        : app;
    }
  });

  return EntitiesModule;
});
