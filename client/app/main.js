(function (root) {
  root.require.config({

    paths: {
      'backbone':                '../vendor/backbone/backbone',
      'backbone.babysitter':     '../vendor/backbone.babysitter/backbone.babysitter',
      'backbone.radio':          '../vendor/backbone.radio/backbone.radio',
      'backbone.wreqr':          'lib/util/noop',
      'backbone.syphon':         '../vendor/backbone.syphon/backbone.syphon',
      'backbone.computedfields': '../vendor/backbone-computedfields/backbone.computedfields',
      'backbone.cocktail':       '../vendor/cocktail/Cocktail',
      'bootstrap':               '../vendor/bootstrap/bootstrap',
      'hogan':                   '../vendor/requirejs-hogan-plugin/hogan',
      'hgn':                     '../vendor/requirejs-hogan-plugin/hgn',
      'jquery':                  '../vendor/jquery/jquery',
      'marionette':              '../vendor/marionette/backbone.marionette',
      'spinner':                 '../vendor/spin.js/spin',
      'text':                    '../vendor/requirejs-hogan-plugin/text',
      'underscore':              '../vendor/underscore/underscore',
      'rsvp':                    '../vendor/rsvp/rsvp',

      // test
      'test':                    '../test',
      'chai':                    '../vendor/chai/chai',
      'chai-jquery':             '../vendor/chai-jquery/chai-jquery',
      'chai-as-promised':        '../vendor/chai-as-promised/chai-as-promised',
      'mocha':                   '../vendor/mocha/mocha',
      'sinon':                   '../vendor/sinon/sinon',
      'sinon-chai':              '../vendor/sinon-chai/sinon-chai',

      // change -dev to -prod for production
      'lib/util/mode':           'lib/util/mode-dev'
    },

    shim: {
      'bootstrap': {
        deps: ['jquery']
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
