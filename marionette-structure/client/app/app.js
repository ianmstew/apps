define(function (require) {
  var Marionette = require('marionette'),
      AppController = require('app.controller'),
      history = require('lib/util/history');
  
  var app = new Marionette.Application();

  app.addRegions({
    headerRegion: '#header-region',
    contentRegion: '#content-region',
    footerRegion: '#footer-region'
  });

  app.on('initialize:after', function () {
    history.start();
  });

  app.appController = new AppController({
    app: app
  });

  // any hyperlinks not tagged "data-bypass" will pass through router
  $(document).on('click', 'a:not([data-bypass])', function (evt) {
    var href = $(this).attr('href');

    if (href) {
      evt.preventDefault();
      history.navigate(href, true);
    }
  });

  return app;
});
