require.config({

  paths: {
    'backbone':                '../vendor/backbone/backbone',
    'backbone.babysitter':     '../vendor/backbone.babysitter/backbone.babysitter',
    'backbone.computedfields': '../vendor/backbone-computedfields/backbone.computedfields',
    'backbone.radio':          '../vendor/backbone.radio/backbone.radio',
    'backbone.wreqr':          '../vendor/backbone.wreqr/backbone.wreqr',
    'bootstrap':               '../vendor/bootstrap/bootstrap',
    'hogan':                   '../vendor/requirejs-hogan-plugin/hogan',
    'hgn':                     '../vendor/requirejs-hogan-plugin/hgn',
    'jquery':                  '../vendor/jquery/jquery',
    'marionette':              '../vendor/marionette/backbone.marionette',
    'spinner':                 '../vendor/spin.js/spin',
    'text':                    '../vendor/requirejs-hogan-plugin/text',
    'underscore':              '../vendor/underscore/underscore',
    
    // change -dev to -prod for production
    'lib/util/logger':              'lib/util/logger-dev'
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
    }
  },

  hgn: {
    templateExtension: '.html'
  }
});

require(['app-bootstrap']);
