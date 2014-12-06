define(function (require) {
  // Browser polyfills
  require('lib/shim/promise');

  // Front end libraries
  require('bootstrap');
  require('parsley');

  // Backbone shims and extensions
  require('backbone.radio');
  require('backbone.syphon');
  require('lib/shim/backbone-promise-ajax');
  require('lib/shim/backbone-syncing-state');

  // Marionette shims and config
  require('lib/shim/marionette-to-json');
  require('lib/shim/marionette-renderer');
  require('lib/shim/marionette-radio');
  require('lib/shim/marionette-radio-events');
  require('lib/config/history-capture-hrefs');
});
