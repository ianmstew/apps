define(function (require) {
  // Browser polyfills
  require('es6-promise');

  // Initialize Twitter Bootstrap scripts
  require('bootstrap');

  // Backbone
  require('backbone');
  require('backbone.computedfields');
  require('backbone.radio');
  require('backbone.stickit');
  require('lib/config/backbone-events-radio.shim');
  require('lib/config/backbone-promise-ajax.shim');
  require('lib/config/backbone-set-parse.shim');

  // Marionette
  require('marionette');
  require('lib/config/marionette-renderer.shim');
  require('lib/config/marionette-radio.shim');
  require('lib/config/marionette-capture-hrefs');
});
