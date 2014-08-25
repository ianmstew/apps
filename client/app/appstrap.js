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
  require('lib/shim/backbone-events-radio');
  require('lib/shim/backbone-promise-ajax');
  require('lib/shim/backbone-set-parse');

  // Marionette
  require('marionette');
  require('lib/shim/marionette-renderer');
  require('lib/shim/marionette-radio');
  require('lib/config/history-capture-hrefs');
});
