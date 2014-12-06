define(function (require, exports, module) {
  var Radio = require('backbone.radio');
  var Module = require('lib/classes/module');
  var AppModel = require('entities/app/app');
  var notifyUtil = require('modules/notify/notify.util');
  var logger = require('lib/util/logger')(module);

  var EditorService = Module.extend({

    channelName: 'editor',

    channelEvents: {
      'app': ['reply', 'getApp'],
      'appId': ['reply', 'getAppId'],
      'set:appId': ['comply', 'setAppId'],
      'services': ['reply', 'getServices'],
      'new:service': ['reply', 'newService'],
      'update:service': ['comply', 'updateService'],
      'destroy:service': ['comply', 'destroyService']
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

    getApp: function () {
      return this.app;
    },

    getAppId: function () {
      return this.app.id;
    },

    // Create a new Service.
    // - Arguments
    //     attrs: {object} Attributes hash
    // - Returns a new Service that is either syncing with server, or in validationError state.
    // - Notifies user on validation error.
    newService: function (attrs) {
      if (!this.app.id) throw new Error('Must set an App ID');

      var service = this.services.create(attrs);
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
