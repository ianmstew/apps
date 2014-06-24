define(function (require) {
  require('marionette');
  require('bootstrap');
  require('backbone.computedfields');
  require('lib/util/eventDebugger');

  var Marionette = require('marionette'),
      app = require('app');

  // Override templating method to use hgn templates
  Marionette.Renderer.render = function (template, data) {
    return template(data);
  };

  // start app
  app.start();

});
