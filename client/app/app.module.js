define(function (require) {
  var Module = require('lib/classes/module');
  var AppEntities = require('app.entities');
  var ManagerModule = require('modules/manager/manager.module');
  var EditorModule = require('modules/editor/editor.module');
  var NotifyModule = require('modules/notify/notify.module');
  var LoadingModule = require('modules/loading/loading.module');
  var OverlayModule = require('modules/overlay/overlay.module');

  var AppModule = Module.extend({

    channelName: 'app',
    startModules: false,

    modules: {
      'entities': AppEntities,
      'manager': ManagerModule,
      'editor': EditorModule,
      'notify': NotifyModule,
      'loading': LoadingModule,
      'overlay': OverlayModule
    },

    app: null,

    initialize: function (options) {
      this.app = (options || {}).app;
    },

    onStart: function () {
      var contentRegion = this.app.getRegion('contentRegion');
      var overlayRegion = this.getRegion('overlayRegion');
      this.getModule('entities').start();
      this.getModule('notify').start();
      this.getModule('loading').start();
      this.getModule('manager').start({ region: contentRegion });
      this.getModule('editor').start({ region: contentRegion });
      this.getModule('overlay').start({ region: overlayRegion });
    }
  });

  return AppModule;
});
