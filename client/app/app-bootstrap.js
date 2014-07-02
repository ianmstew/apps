define(function (require) {
  require('bootstrap');
  require('backbone.computedfields');
  require('lib/util/eventDebugger');

  var Marionette = require('marionette'),
      history = require('lib/util/history'),
      app = require('app'),
      dashboard = require('modules/dashboard/dashboard.module'),
      appmgr = require('modules/appmgr/appmgr.module');

  // Override templating method to use hgn templates
  Marionette.Renderer.render = function (template, data) {
    return template(data);
  };

  // Pass to routre any hyperlinks tagged with "data-app"
  $(document).on('click', '#content-region a:not([data-bypass])', function (evt) {
    var href = $(this).attr('href');

    if (href) {
      evt.preventDefault();
      history.navigate(href, true);
    }
  });

  app.on('initialize:before', function () {
    dashboard.start({
      mainRegion: app.contentRegion
    });
    appmgr.start({
      mainRegion: app.contentRegion
    });
  });

  app.start();
});
