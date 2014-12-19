define(function (require) {
  var Module = require('lib/classes/module');
  var EditorPresenter = require('modules/editor/editor.presenter');
  var EditorService = require('modules/editor/editor.service');
  var history = require('lib/util/history');

  var EditorModule = Module.extend({

    channelName: 'editor',

    routes: {
      'apps/:id': 'showOverviewTabRedirect',
      'apps/:id/overview': 'showOverviewTab',
      'apps/:id/settings': 'showSettingsTab',
      'apps/:id/services': 'showServicesTab'
    },

    modules: {
      'entities': EditorService
    },

    _editor: undefined,

    showOverviewTabRedirect: function (appId) {
      history.navigate('apps/' + appId + '/overview', { replace: true });
      this.showOverviewTab(appId);
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
