define(function (require) {
  // Browser polyfills
  require('lib/shim/es6-promise');

  // Initialize Twitter Bootstrap scripts
  require('bootstrap');

  // Backbone shims and extensions
  require('backbone');
  require('backbone.radio');
  require('backbone.syphon');
  require('lib/shim/backbone-promise-ajax');
  require('lib/shim/backbone-syncing-state');
  require('lib/shim/backbone-cocktail');

  // Marionette shims and config
  require('marionette');
  require('lib/shim/marionette-renderer');
  require('lib/shim/marionette-radio');
  require('lib/shim/marionette-radio-events');
  require('lib/config/history-capture-hrefs');
});
