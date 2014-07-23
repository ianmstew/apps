define(function (require) {
  var Marionette = require('marionette'),
      history = require('lib/util/history'),
      channels = require('channels'),
      appManager = require('modules/appManager/appManager'),
      entities = require('modules/entities/entities');
  
  var app = new Marionette.Application();

  app.addRegions({
    contentRegion: '#content-region'
  });

  app.addInitializer(function () {
    appManager.triggerMethod('start', {
      region: app.contentRegion
    });
    entities.triggerMethod('start');
  });

  app.on('start', function () {
    history.start();
    
    if (history.getCurrentRoute() === '') {
      channels.appManager.trigger('list:apps');
    }
  });

  return app;
});
