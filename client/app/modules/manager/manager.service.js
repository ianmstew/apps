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
      'destroy:app': ['comply', 'destroyApp'],
      'refresh:apps': ['comply', 'refreshApps']
    },

    apps: undefined,
    notifyChannel: undefined,

    initialize: function () {
      this.notifyChannel = Radio.channel('notify');
      this.apps = new AppsCollection();
      notifyUtil.handleModelErrors(this, this.apps);
    },

    onStart: function () {
      // TODO: Do we really want to load all apps on start?  If so, we should move the apps
      // service to a higher (global) level.
      this.apps.fetch();
    },

    refreshApps: function () {
      this.apps.fetch();
    },

    // Create a new App
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
    updateApp: function (appId, attrs, options) {
      var app = this.apps.get(appId);
      var errorMsg;
      if (!app) {
        errorMsg = 'The app you selected does not exist.'; 
        this.notifyChannel.command('add:userError', errorMsg, { appId: appId });
      }
      if ((options || {}).sync === false) {
        app.set(attrs);
      } else {
        app.save(attrs);
      }
      if (app.validationError) {
        errorMsg = 'Your app was not updated. ' + app.validationError;
        this.notifyChannel.command('add:userError', errorMsg, { app: app });
      }
    },

    destroyApp: function (appId, options) {
      var app = this.apps.get(appId);
      if (!app) {
        this.notifyChannel.command('add:userError',
          'The app you selected does not exist.', { appId: appId });
        return;
      }
      if ((options || {}).sync === false) {
        this.apps.remove(app);
      } else {
        app.destroy();
      }
    },

    getApps: function () {
      return this.apps;
    }
  });

  return ManagerService;
});
