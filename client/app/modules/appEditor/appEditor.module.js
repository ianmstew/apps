define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history'),
      AppOverviewManager = require('modules/appEditor/overview/appOverview.manager');
      AppSettingsManager = require('modules/appEditor/settings/appSettings.manager');
      AppServicesManager = require('modules/appEditor/services/appServices.manager');

  var AppEditorModule = Module.extend({

    routes: {
      'apps/:id'          : 'showOverview',
      'apps/:id/settings' : 'showSettings',
      'apps/:id/services' : 'showServices',
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
      this.appOverview.//();
      history.navigate('apps/:id');
    },

    showSettings: function () {
      this.appSettings.//();
      history.navigate('apps/:id/settings');
    },

    showServices: function () {
      this.appServices.//();
      history.navigate('apps/:id/services');
    }

    showView: function (view) {
      this.getRegion().show(view);
    }
  });

  return AppEditorModule;
});
