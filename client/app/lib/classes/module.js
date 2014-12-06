define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var Cocktail = require('backbone.cocktail');

  /*
   * A Module is a top-level arbiter for application routing and channel events. Its purpose is to
   * take module-level events and delegate to child views or presenters.
   *
   * Features:
   *   - Start/stop events which provide onStart()/onStop() hooks
   *   - Has a channel
   *   - May have a region, accessible using getRegion() and used by show()
   *   - May have child modules, which are started automatically unless startModules is false
   */
  var Module = Marionette.Object.extend({

    // Declarative set of child modules
    // { 'moduleName': ModuleClass }
    modules: undefined,

    // Backbone Router routes object
    routes: undefined,

    // Whether to start child modules when I start
    startModules: true,

    // My region
    region: undefined,

    // Local storage of child module instances
    _modules: undefined,

    // Whether I am running
    _isRunning: undefined,

    // Router instance
    _router: undefined,

    constructor: function () {
      // If child defines initialize, ensure call to my own initialize
      // (Child will not have to call superclass initialize)
      if (this.initialize !== Module.prototype.initialize) {
        this.initialize = _.wrap(this.initialize, function (initialize, options) {

          // Call parent initialize first
          Module.prototype.initialize.call(this, options);

          // Call child initialize
          initialize.call(this, options);
        });
      }
      Module.__super__.constructor.apply(this, arguments);
    },

    initialize: function (options) {
      this.region = (options || {}).region;
      if (this.routes) this._constructRouter();
      if (this.modules) {
        this._constructModules();
        if (this.startModules) this.on('start', this._startModules.bind(this));
        this.on('stop', this._stopModules.bind(this));
      }
    },

    start: function (options) {
      this.triggerMethod('before:start', options);
      this.region = (options || {}).region || this.region;
      this._isRunning = true;
      this.triggerMethod('start', options);
    },

    stop: function (options) {
      if (this._isRunning) {
        this.triggerMethod('before:stop', options);
        this._isRunning = false;
        this.triggerMethod('stop', options);
      }
    },

    getModule: function (module) {
      return this._modules[module];
    },

    isRunning: function () {
      return this._isRunning;
    },

    getRegion: function () {
      return this.region;
    },

    show: function (view, options) {
      this.getRegion().show(view, options);
    },

    destroy: function (options) {
      this.stop();
      this.triggerMethod('before:destroy', options);
      this._destructModules();
      this.triggerMethod('destroy', options);
    },

    _startModules: function (options) {
      _.chain(this._modules)
        .values()
        .invoke('stop', options);
    },

    _stopModules: function (options) {
      _.chain(this._modules)
        .values()
        .invoke('stop', options);
    },

    _constructRouter: function () {
      this._router = new (Marionette.AppRouter.extend({
        appRoutes: this.routes,
        controller: this
      }))();
    },

    _constructModules: function () {
      var modules = {};
      this._destructModules();
      _.each(this.modules, function (Module, name) {
        modules[name] = new Module();
      });
      this._modules = modules;
    },

    _destructModules: function () {
      _.each(this._modules, function (module, name) {
        module.destroy();
        this._modules[name] = null;
      }, this);
      this._modules = null;
    }
  });

  Cocktail.mixin(Module, HasChannel);

  return Module;
});
