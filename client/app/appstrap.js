define(function (require) {
  // Browser polyfills
  require('es6-promise');

  // Initialize Twitter Bootstrap scripts
  require('bootstrap');

  // Backbone extensions
  require('marionette');
  require('backbone.computedfields');
  require('backbone.radio');

  // Configure global behavior and shim framework methods
  require('lib/config/es6-promise-ajax.shim');
  require('lib/config/renderer.shim');
  require('lib/config/radio.shim');
  require('lib/config/capture-hrefs');
});
