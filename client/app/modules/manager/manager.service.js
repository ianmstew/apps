define(function (require) {
  var Radio = require('backbone.radio');
  var Module = require('lib/classes/module');
  var AppsCollection = require('entities/app/apps');
  var notifyUtil = require('modules/notify/notify.util');

  var ManagerService = Module.extend({

    channelName: 'manager',

    channelEvents: {
      'apps': ['reply', 'getApps'],
      'new:app': ['reply', 'newApp'],
      'update:app': ['comply', 'updateApp'],
      'destroy:app': ['comply', 'destroyApp']
    },

    apps: undefined,
    notifyChannel: undefined,

    initialize: function () {
      this.notifyChannel = Radio.channel('notify');
      this.apps = new AppsCollection();
      notifyUtil.handleModelErrors(this, this.apps);
      this.apps.fetch();
    },

    // Create a new App.
    // - Arguments
    //     attrs: {object} Attributes hash
    // - Returns a new App that is either syncing with server, or in validationError state.
    // - Notifies user on validation error.
    newApp: function (attrs) {
      var app = this.apps.create(attrs);
      var error = app.validationError;
      if (error) this.notifyChannel.command('add:userError',
        'Your app was not created. ' + error, { app: app });
      return app;
    },

    // Update an App.
    // - Arguments
    //     serviceId {string} App ID to update
    //     attrs: {object} Attributes hash
    // - Returns a new App that is either syncing with server, or in validationError state
    // - Notifies user on non-existent App ID or validation error.
    updateApp: function (appId, attrs) {
      var app = this.apps.get(appId);
      var error;
      if (!app) {
        this.notifyChannel.command('add:userError',
          'The app you selected does not exist.', { appId: appId });
        return;
      }
      app.save(attrs);
      error = app.validationError;
      if (error) this.notifyChannel.command('add:userError',
        'Your app was not updated. ' + error, { app: app });
    },

    destroyApp: function (appId) {
      var app = this.apps.get(appId);
      if (!app) {
        this.notifyChannel.command('add:userError',
          'The app you selected does not exist.', { appId: appId });
        return;
      }
      app.destroy();
    },

    getApps: function () {
      return this.apps;
    }
  });

  return ManagerService;
});
