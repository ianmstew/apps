define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history'),
      AppOverviewManager = require('modules/appEditor/overview/appOverview.manager');
      AppSettingsManager = require('modules/appEditor/settings/appSettings.manager');
      AppServicesManager = require('modules/appEditor/services/appServices.manager');

  var AppEditorModule = Module.extend({

    routes: {
      'apps/app': 'showOverview',
      'apps/app/settings': 'showSettings',
      'apps/app/services': 'showServices',
    },

    initialize: function () {
      _.bindAll(this, 'showOverview', 'showSettings', 'showServices', 'showView');

      this.listenTo(channels.appEditor, 'show:overview', this.showOverview);
      this.listenTo(channels.appEditor, 'show:settings', this.showSettings);
      this.listenTo(channels.appEditor, 'show:services', this.showServices);
      channels.appEditor.comply('show:view', this.showView);
    },

    onStart: function () {
    },

    showOverview: function () {
      history.navigate('apps/app');
    },

    showSettings: function () {
      history.navigate('apps/app/settings');
    },

    showServices: function () {
      history.navigate('apps/app/services');
    }

    showView: function (view) {
      this.getRegion().show(view);
    }
  });

  return AppEditorModule;
});
