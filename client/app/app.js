define(function (require) {
  var Marionette = require('marionette');
  var history = require('lib/util/history');
  var HasModules = require('lib/mixin/has-modules');
  var ManagerModule = require('modules/manager/manager.module');
  var EditorModule = require('modules/editor/editor.module');
  var AppEntities = require('app.entities');
  var NotificationModule = require('modules/notification/notification.module');

  var App = Marionette.Application.extend({

    channelName: 'global',

    regions: {
      contentRegion: '#content-region'
    },

    modules: {
      'entities': AppEntities,
      'manager': ManagerModule,
      'editor': EditorModule,
      'notification': NotificationModule
    },

    constructor: function () {
      App.__super__.constructor.apply(this, arguments);
      this.initializeMixins();
      this.addInitializer(this._startModules);
    },

    _startModules: function () {
      var contentRegion = this.getRegion('contentRegion');
      this.getModule('notification').start();
      this.getModule('entities').start();
      this.getModule('manager').start({ region: contentRegion });
      this.getModule('editor').start({ region: contentRegion });
    },

    onStart: function () {
      history.start();

      if (history.getCurrentRoute() === '') {
        history.navigate('/apps', { trigger: true });
      }
    }
  });

  HasModules.mixInto(App, { manualStart: true });

  return App;
});
