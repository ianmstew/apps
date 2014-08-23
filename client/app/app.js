define(function (require) {
  var Marionette = require('marionette');
  var Radio = require('backbone.radio');
  var history = require('lib/util/history');
  var ManagerModule = require('modules/manager/manager.module');
  var EditorModule = require('modules/editor/editor.module');
  var EntitiesModule = require('modules/entities/entities.module');

  var App = Marionette.Application.extend({

    regions: {
      contentRegion: '#content-region'
    },

    modules: null,

    constructor: function () {
      App.__super__.constructor.apply(this, arguments);
      _.bindAll(this, 'createModules', 'startEntities', 'startModules');
      this.addInitializer(this.createModules);
      this.addInitializer(this.startEntities);
      this.addInitializer(this.startModules);
    },

    onStart: function () {
      history.start();

      if (history.getCurrentRoute() === '') {
        Radio.channel('manager').command('list:apps');
      }
    },

    createModules: function () {
      this.modules = {
        manager: new ManagerModule({
          region: this.getRegion('contentRegion')
        }),
        editor: new EditorModule({
          region: this.getRegion('contentRegion')
        }),
        entities: new EntitiesModule()
      };
    },

    startEntities: function () {
      this.modules.entities.start();
    },

    startModules: function () {
      this.modules.manager.start();
      this.modules.editor.start();
    }
  });

  return App;
});
