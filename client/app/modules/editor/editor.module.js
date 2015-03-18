define(function (require) {
  // Force manager module routes to be loaded first 
  require('modules/manager/manager.module');
  var Module = require('lib/classes/module');
  var EditorPresenter = require('modules/editor/editor.presenter');
  var EditorService = require('modules/editor/editor.service');
  var history = require('lib/util/history');

  var EditorModule = Module.extend({

    channelName: 'editor',

    routes: {
      'apps/:id/settings/': 'showSettingsTab',
      'apps/:id/services/': 'showServicesTab',
      'apps/:id/overview/': 'showOverviewTab',
      'apps/:id': 'redirectToOverview'
    },

    modules: {
      'entities': EditorService
    },

    _editor: undefined,

    // For usability, allow a bare ID to redirect to overview
    redirectToOverview: function (appId) {
      // Only redirect if a bare ID, with possibly a terminating slash
      var bareIdMatch = appId.match(/^([^\/]+)\/?$/);
      if (bareIdMatch) {
        appId = bareIdMatch[1];
        history.redirect('apps/' + appId + '/overview/');
      }
    },

    showOverviewTab: function (appId) {
      this.channel.command('set:appId', appId);
      this.getEditor().present({ tab: 'overview' });
    },

    showServicesTab: function (appId) {
      this.channel.command('set:appId', appId);
      this.getEditor().present({ tab: 'services' });
    },

    showSettingsTab: function (appId) {
      this.channel.command('set:appId', appId);
      this.getEditor().present({ tab: 'settings' });
    },

    getEditor: function () {
      if (!this._editor || this._editor.isDestroyed) {
        this._editor = new EditorPresenter({
          region: this.getRegion()
        });
      }
      return this._editor;
    }
  });

  return EditorModule;
});
