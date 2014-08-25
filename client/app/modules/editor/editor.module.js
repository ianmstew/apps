define(function (require) {
  var Module = require('lib/classes/module');
  var history = require('lib/util/history');
  var OverviewPresenter = require('modules/editor/overview/overview.presenter');
  var SettingsPresenter = require('modules/editor/settings/settings.presenter');
  var ServicesPresenter = require('modules/editor/services/services.presenter');

  var EditorModule = Module.extend({

    channelName: 'editor',

    routes: {
      'apps/:id/overview': 'showOverviewTab',
      'apps/:id/settings': 'showSettingsTab',
      'apps/:id/services': 'showServicesTab'
    },

    presenters: {
      'overview': OverviewPresenter,
      'services': ServicesPresenter,
      'settings': SettingsPresenter
    },

    channelEvents: {
      'appId': ['reply', 'getAppId'],
      'show:services:tab': ['comply', 'showServicesTab'],
      'show:overview:tab': ['comply', 'showOverviewTab'],
      'show:settings:tab': ['comply', 'showSettingsTab']
    },

    appId: null,

    getAppId: function () {
      return this.appId;
    },

    showOverviewTab: function (appId) {
      this.appId = appId || this.appId;
      this.getPresenter('overview').show();
      history.navigate('apps/' + this.appId + '/overview');
    },

    showServicesTab: function (appId) {
      this.appId = appId || this.appId;
      this.getPresenter('services').show();
      history.navigate('apps/' + this.appId + '/services');
    },

    showSettingsTab: function (appId) {
      this.appId = appId || this.appId;
      this.getPresenter('settings').show();
      history.navigate('apps/' + this.appId + '/settings');
    }
  });

  return EditorModule;
});
