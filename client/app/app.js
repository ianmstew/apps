define(function (require) {
  var Marionette = require('marionette'),
      history = require('lib/util/history'),
      channels = require('channels'),
      AppManager = require('modules/appManager/appManager.module'),
      Entities = require('modules/entities/entities.module');

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
        channels.appManager.command('list:apps');
      }
    },

    createModules: function () {
      this.modules = {
        manager: new AppManager({
          region: this.getRegion('contentRegion')
        }),
        entities: new Entities()
      };
    },

    startEntities: function () {
      this.modules.entities.start();
    },

    startModules: function () {
      this.modules.manager.start();
    }
  });

  return App;
});
