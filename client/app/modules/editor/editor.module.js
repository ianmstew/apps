define(function (require) {
  var Module = require('lib/classes/module');
  var EditorPresenter = require('modules/editor/editor.presenter');
  var EditorEntities = require('modules/editor/editor.entities');

  var EditorModule = Module.extend({

    channelName: 'editor',

    routes: {
      'apps/:id/overview': 'showOverviewTab',
      'apps/:id/settings': 'showSettingsTab',
      'apps/:id/services': 'showServicesTab'
    },

    modules: {
      'entities': EditorEntities
    },

    presenters: {
      'editor': EditorPresenter
    },

    showOverviewTab: function (appId) {
      this.channel.command('set:appId', (appId || this.appId));
      this.getPresenter('editor').present({ tab: 'overview' });
    },

    showServicesTab: function (appId) {
      this.channel.command('set:appId', (appId || this.appId));
      this.getPresenter('editor').present({ tab: 'services' });
    },

    showSettingsTab: function (appId) {
      this.channel.command('set:appId', (appId || this.appId));
      this.getPresenter('editor').present({ tab: 'settings' });
    }
  });

  return EditorModule;
});
