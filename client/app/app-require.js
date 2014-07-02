require.config({

  paths: {
    'jquery':                  '../vendor/jquery/jquery',
    'underscore':              '../vendor/underscore/underscore',
    'backbone':                '../vendor/backbone/backbone',
    'backbone.wreqr':          '../vendor/backbone.wreqr/backbone.wreqr',
    'backbone.babysitter':     '../vendor/backbone.babysitter/backbone.babysitter',
    'backbone.computedfields': '../vendor/backbone-computedfields/backbone.computedfields',
    'marionette':              '../vendor/marionette/backbone.marionette',
    'bootstrap':               '../vendor/bootstrap/bootstrap',
    'spinner':                 '../vendor/spin.js/spin',
    'hogan':                   '../vendor/requirejs-hogan-plugin/hogan',
    'hgn':                     '../vendor/requirejs-hogan-plugin/hgn',
    'text':                    '../vendor/requirejs-hogan-plugin/text',
    
    // change to -prod for production
    'lib/util/logger':              'lib/util/logger-dev',
    'lib/util/eventDebugger':       'lib/util/eventDebugger-dev'
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
