define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history'),
      AppOverviewManager = require('modules/appEditor/overview/appOverview.manager');
      AppSettingsManager = require('modules/appEditor/settings/appSettings.manager');
      AppServicesManager = require('modules/appEditor/services/appServices.manager');

  var AppEditorModule = Module.extend({

    routes: {
      'apps/:id/overview' : 'showOverviewTab',
      'apps/:id/settings' : 'showSettingsTab',
      'apps/:id/services' : 'showServicesTab'
    },

    initialize: function () {
      _.bindAll(this, 'showOverviewTab', 'showServicesTab', 'showSettingsTab');

      channels.appEditor.comply('show:services:tab', this.showServicesTab);
      channels.appEditor.comply('show:overview:tab', this.showOverviewTab);
      channels.appEditor.comply('show:settings:tab', this.showSettingsTab);
    },

    showOverviewTab: function (view) {
       console.log('Overview shown here');
       this.getRegion().show(view);
       history.navigate('apps/:id/overview');
    },
    
    showServicesTab: function (view) {
      console.log('Services shown here');
      this.getRegion().show(view);
      history.navigate('apps/:id/services');
    },

    showSettingsTab: function (view) {
      console.log('Settings shown here');
      this.getRegion().show(view);
      history.navigate('apps/:id/settings');
    },

    showView: function (view) {
      this.getRegion().show(view);
    }
  });

  return AppEditorModule;
});
