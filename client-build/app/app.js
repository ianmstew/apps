define(function (require) {
  var Marionette = require('marionette'),
      history = require('lib/util/history'),
      globalCh = require('global.channel');
  
  var app = new Marionette.Application();

  app.addRegions({
    contentRegion: '#content-region'
  });

  app.on('initialize:after', function () {
    history.start();

    if (history.getCurrentRoute() === '') {
      globalCh.vent.trigger('show:dashboard');
    }
  });

  return app;
});
