define(function (require, exports, module) {
  var Radio = require('backbone.radio');
  var Module = require('lib/classes/module');
  var AppModel = require('entities/app/app');
  var notifyUtil = require('modules/notify/notify.util');
  var logger = require('lib/util/logger')(module);

  // To be fully utilized, the Editor Service requires an appId;
  // use Radio.command('editor', 'setId', appId).
  var EditorService = Module.extend({

    channelName: 'editor',

    channelEvents: {
      'app': ['reply', 'getApp'],
      'appId': ['reply', 'getAppId'],
      'set:appId': ['comply', 'setAppId'],
      'services': ['reply', 'getServices'],
      'service': ['reply', 'getService'],
      'new:service': ['reply', 'newService'],
      'update:service': ['comply', 'updateService'],
      'destroy:service': ['comply', 'destroyService'],
      'update:app': ['comply', 'updateApp']
    },

    app: undefined,
    services: undefined,
    notifyChannel: undefined,

    initialize: function () {
      this.notifyChannel = Radio.channel('notify');
      this.app = new AppModel();
      this.services = this.app.services;
      notifyUtil.handleModelErrors(this, this.app);
      this.listenTo(this.app, 'change:_id', this.onChangeAppId);
    },

    getServices: function () {
      return this.services;
    },

    getService: function (serviceId) {
      return this.services.get(serviceId);
    },

    getApp: function () {
      return this.app;
    },

    getAppId: function () {
      return this.app.id;
    },

    // Update this App
    // - Arguments
    //     attrs: {object} Attributes hash
    // - Notifies user on non-existent App ID or validation error.
    updateApp: function (attrs) {
      var app = this.app;
      var errorMsg;
      app.save(attrs);
      if (app.validationError) {
        errorMsg = 'Your app was not updated. ' + app.validationError;
        this.notifyChannel.command('add:userError', errorMsg, { appId: app.id });
      } else {
        Radio.command('manager', 'update:app', app.id, attrs, { sync: false });
      }
    },

    destroyApp: function () {
      var app = this.app;
      if (!app) {
        this.notifyChannel.command('add:userError',
          'The app you selected does not exist.', { appId: app.id });
      } else {
        app.destroy();
        Radio.command('manager', 'destroy:app', app.id, { sync: false });
      }
    },

    // Create a new Service.
    // - Arguments
    //     attrs: {object} Attributes hash
    // - Returns a new Service that is either syncing with server, or in validationError state.
    // - Notifies user on validation error.
    newService: function (attrs) {
      if (!this.app.id) throw new Error('Must set an App ID');

      var service = this.services.create(attrs, { parse: true });
      var error = service.validationError;
      if (error) {
        this.notifyChannel.command('add:userError',
          'Your service was not created. ' + error, { service: service });
      }
      return service;
    },

    // Update a Service.
    // - Arguments
    //     serviceId {string} Service ID to update
    //     attrs: {object} Attributes hash
    // - Returns a new Service that is either syncing with server, or in validationError state
    // - Notifies user on non-existent Service ID or validation error.
    updateService: function (serviceId, attrs) {
      if (!this.app.id) throw new Error('Must set an App ID');

      var service = this.services.get(serviceId);
      var error;

      if (!service) {
        this.notifyChannel.command('add:userError',
          'The service you selected does not exist.', { serviceId: serviceId });
        return;
      }

      service.save(attrs);
      error = service.validationError;
      if (error) {
        this.notifyChannel.command('add:userError',
          'Your service was not updated. ' + error, { service: service });
      }
    },

    destroyService: function (serviceId) {
      var service = this.services.get(serviceId);

      if (!service) {
        this.notifyChannel.command('add:userError',
          'The service you selected does not exist.', { serviceId: serviceId });
        return;
      }

      service.destroy();
    },

    setAppId: function (appId) {
      this.app.set('_id', appId);
    },

    onChangeAppId: function (app, appId) {
      logger.debug('App id changed: ' + appId);
      this.app.fetch();
    }
  });

  return EditorService;
});
