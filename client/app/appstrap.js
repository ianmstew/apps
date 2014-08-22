define(function (require) {
  // Establish globals Backbone, $, _
  require('backbone');

  // Initialize Twitter Bootstrap scripts
  require('bootstrap');

  // Backbone extensions
  require('marionette');
  require('backbone.computedfields');
  require('backbone.radio');

  // Polyfills
  require('es6-promise');

  // Configure global behavior and shim framework methods
  require('lib/config/renderer');
  require('lib/config/capture-hrefs');
  require('lib/config/es6-promise-ajax');
});
