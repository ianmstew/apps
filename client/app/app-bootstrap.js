define(function (require) {
  require('bootstrap');
  require('backbone.computedfields');
  require('backbone.radio');
  require('lib/config/renderer');
  require('lib/config/captureHrefs');
  require('lib/config/debugRadio');

  var App = require('app');

  (new App()).start();
});
