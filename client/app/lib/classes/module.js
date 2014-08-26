define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasRegion = require('lib/mixin/has-region');
  var HasPresenters = require('lib/mixin/has-presenters');

  /*
   * Module is a lightweight class that implements:
   *   - start/stop methods
   *   - a routes hash
   *   - ownership of a region passed via start() or new()
   * TODO: unregister routes for module that is stopped?
   */
  var Module = Marionette.Object.extend({

    isRunning: null,
    _router: null,

    constructor: function (options) {
      Module.__super__.constructor.apply(this, arguments);
      HasChannel.mixinto(this);
      HasRegion.mixinto(this);
      HasPresenters.mixinto(this, { initialize: false });
      this._constructRoutes(this.routes || {});
    },

    _constructRoutes: function (routes) {
      this._router = new (Marionette.AppRouter.extend({
        appRoutes: routes,
        controller: this
      }))();
    },

    start: function (options) {
      this.triggerMethod('before:start', options);
      if (this.presenters) this.constructPresenters();
      this.isRunning = true;
      this.triggerMethod('start', options);
    },

    stop: function (options) {
      this.triggerMethod('before:stop', options);
      if (this.presenters) this.destructPresenters();
      this.isRunning = false;
      this.triggerMethod('stop', options);
    }
  });

  return Module;
});
