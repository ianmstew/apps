(function (root) {
  root.require.config({

    paths: {
      'backbone':                '../vendor/backbone/backbone',
      'backbone.babysitter':     '../vendor/backbone.babysitter/backbone.babysitter',
      'backbone.radio':          '../vendor/backbone.radio/backbone.radio',
      'backbone.wreqr':          '../vendor/backbone.wreqr/backbone.wreqr',
      'backbone.stickit':        '../vendor/backbone.stickit/backbone.stickit',
      'backbone.computedfields': '../vendor/backbone.computedfields/backbone.computedfields',
      'bootstrap':               '../vendor/bootstrap/bootstrap',
      'hogan':                   '../vendor/requirejs-hogan-plugin/hogan',
      'hgn':                     '../vendor/requirejs-hogan-plugin/hgn',
      'jquery':                  '../vendor/jquery/jquery',
      'marionette':              '../vendor/marionette/backbone.marionette',
      'spinner':                 '../vendor/spin.js/spin',
      'text':                    '../vendor/requirejs-hogan-plugin/text',
      'underscore':              '../vendor/underscore/underscore',
      'es6-promise':             '../vendor/es6-promise/promise',

      // test
      'test':                    '../test',
      'chai':                    '../vendor/chai/chai',
      'chai-jquery':             '../vendor/chai-jquery/chai-jquery',
      'chai-as-promised':        '../vendor/chai-as-promised/chai-as-promised',
      'mocha':                   '../vendor/mocha/mocha',
      'sinon':                   '../vendor/sinon/sinon',
      'sinon-chai':              '../vendor/sinon-chai/sinon-chai',

      // change -dev to -prod for production
      'lib/util/logger':         'lib/util/logger-dev',
      'app-bootstrap':           'app-bootstrap-dev'
    },

    shim: {
      'underscore': {
        exports: '_'
      },
      'bootstrap': {
        deps: ['jquery']
      },
      'backbone.computedfields': {
        deps: ['backbone']
      },
      'sinon': {
        exports: 'sinon'
      },
      'mocha': {
        exports: 'mocha'
      }
    },

    hgn: {
      templateExtension: '.html'
    }
  });
})(this);

if (window.MODE_TEST) {
  require(['test/spec-runner']);
} else {
  require(['start-dev']);
}
