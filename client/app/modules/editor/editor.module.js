define(function (require) {
  var Module = require('lib/classes/module');
  var Radio = require('backbone.radio');
  var history = require('lib/util/history');
  var OverviewPresenter = require('modules/editor/overview/overview.presenter');
  var SettingsPresenter = require('modules/editor/settings/settings.presenter');
  var ServicesPresenter = require('modules/editor/services/services.presenter');

  var EditorModule = Module.extend({

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

    channelName: 'editor',

    channelEvents: {
      'fetch:services': ['reply', 'getServices'],
      'show:services:tab': ['comply', 'showServicesTab'],
      'show:overview:tab': ['comply', 'showOverviewTab'],
      'show:settings:tab': ['comply', 'showSettingsTab'],
      'show:view': ['comply', 'showView']
    },

    appId: null,

    initialize: function () {
      _.bindAll(this, 'fetchServices');
    },

    getServices: function () {
      return new Promise(this.fetchServices);
    },

    // NOTE: NOT WORKING YET :(
    fetchServices: function (resolve, reject) {
      Radio.channel('entities').request('fetch:app', this.appId)
        .then(function (app) {
          resolve(app.get('services'));
        })
        .catch(function () {
          reject();
        });
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
    },

    showView: function (view) {
      this.region.show(view);
    }
  });

  return EditorModule;
});
