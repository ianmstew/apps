define(function (require) {
  var Module = require('lib/classes/module');
  var history = require('lib/util/history');
  var EditorPresenter = require('modules/editor/editor.presenter');

  var EditorModule = Module.extend({

    channelName: 'editor',

    routes: {
      'apps/:id/overview': 'showOverviewTab',
      'apps/:id/settings': 'showSettingsTab',
      'apps/:id/services': 'showServicesTab'
    },

    presenters: {
      'editor': EditorPresenter
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
      this.getPresenter('editor').present({ tab: 'overview' });
      history.navigate('apps/' + this.appId + '/overview');
    },

    showServicesTab: function (appId) {
      this.appId = appId || this.appId;
      this.getPresenter('editor').present({ tab: 'services' });
      history.navigate('apps/' + this.appId + '/services');
    },

    showSettingsTab: function (appId) {
      this.appId = appId || this.appId;
      this.getPresenter('editor').present({ tab: 'settings' });
      history.navigate('apps/' + this.appId + '/settings');
    }
  });

  return EditorModule;
});
