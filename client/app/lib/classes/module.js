define(function (require) {
  var Marionette = require('marionette');
  var Router = require('lib/classes/router');
  var Cocktail = require('cocktail');
  var HasChannel = require('lib/mixin/has-channel');
  var HasModules = require('lib/mixin/has-modules');
  var HasSingletons = require('lib/mixin/has-singletons');

  /*
   * A Module is a top-level arbiter for application routing and channel events. Its purpose is to
   * take module-level events and delegate (usually) to child presenters.
   *
   * Features:
   *   - Start/stop methods/events which provides onStart()/onStop() hooks
   *   - Integrated router which is enabled/disabled on start/stop
   *   - Requires a channel
   *   - May own a region
   */
  var Module = Marionette.Object.extend({

    region: null,
    routes: null,
    isRunning: null,
    _router: null,
    startWithParent: true,

    constructor: function (options) {
      this.region = (options || {}).region;
      this.initializeMixins(options);
      if (this.routes) this._constructRouter();
      Module.__super__.constructor.apply(this, arguments);
    },

    _constructRouter: function () {
      this._router = new Router({
        routes: this.routes,
        controller: this
      });
    },

    start: function (options) {
      this.triggerMethod('before:start', options);
      this.region = (options || {}).region || this.region;
      if (this._router) this._router.enable();
      this.isRunning = true;
      this.triggerMethod('start', options);
    },

    stop: function (options) {
      if (this.isRunning) {
        this.triggerMethod('before:stop', options);
        if (this._router) this._router.disable();
        this.isRunning = false;
        this.triggerMethod('stop', options);
      }
    },

    destroy: function (options) {
      this.stop();
      this.triggerMethod('before:destroy', options);
      this.triggerMethod('destroy', options);
    }
  });

  Cocktail.mixin(Module, HasChannel, HasModules, HasSingletons);

  return Module;
});
