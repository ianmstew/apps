define(function (require) {
  var Marionette = require('marionette'),
      history = require('lib/util/history'),
      channels = require('channels'),
      AppManagerModule = require('modules/appManager/appManager.module'),
      EntitiesModule = require('modules/entities/entities.module');
  
  var App = Marionette.Application.extend({

    regions: {
      contentRegion: '#content-region'
    },

    modules: null,

    // runs 1st
    constructor: function () {
      App.__super__.constructor.apply(this, arguments);
      _.bindAll(this, 'initializer');

      this.modules = {
        appManager: new AppManagerModule({
          region: this.contentRegion
        }),

        // inject bootstrapped user data from server
        entities: new EntitiesModule({
          user: (window.bootstrap || {}).user
        })
      };

      this.addInitializer(this.initializer);
    },

    // runs 2nd
    onBeforeStart: function () {
      // modules may depend on entities, so ensure they are running first
      this.modules.entities.start();
    },

    // runs 3rd
    initializer: function () {
      this.modules.appManager.start();
    },

    // runs 4th
    onStart: function () {
      history.start();
      
      if (history.getCurrentRoute() === '') {
        channels.appManager.trigger('list:apps');
      }
    }
  });

  return App;
});
