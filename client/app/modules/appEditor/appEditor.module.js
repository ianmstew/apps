define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history'),
      AppOverviewManager = require('modules/appEditor/overview/appOverview.manager');
      AppSettingsManager = require('modules/appEditor/settings/appSettings.manager');
      AppServicesManager = require('modules/appEditor/services/appServices.manager');

  var AppEditorModule = Module.extend({

    routes: {
      'apps/:id'          : 'showOverviewTab',
      'apps/:id/settings' : 'showSettingsTab',
      'apps/:id/services' : 'showServicesTab',
    },

    initialize: function () {
      _.bindAll(this, 'showOverviewTab', 'showServicesTab', 'showSettingsTab');

      channels.appManager.comply('show:services:tab', this.showServicesTab);
      channels.appManager.comply('show:overview:tab', this.showOverviewTab);
      channels.appManager.comply('show:settings:tab', this.showSettingsTab);
    },

    showOverviewTab: function (view) {
       this.getRegion().show(view);
       history.navigate('apps/:id');
    },
    
    showServicesTab: function (view) {
      // highlight the services tab and change any other wrapper stuff
      this.getRegion().show(view);
      history.navigate('apps/:id/services');
    },

    showSettingsTab: function (view) {
      this.getRegion().show(view);
      history.navigate('apps/:id/settings');
    },

    showView: function (view) {
      this.getRegion().show(view);
    }

    /*
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
    */
  });

  return AppEditorModule;
});
