define(function (require) {
  var Marionette = require('marionette');

  /*
   * Module is a lightweight class that implements:
   *   - start/stop methods
   *   - a routes hash
   *   - ownership of a region passed via start() or new()
   * TODO: unregister routes for module that is stopped?
   */
  var Module = Marionette.Object.extend({

    _running: null,
    _router: null,
    _region: null,

    constructor: function (options) {
      if (this.routes) {
        this._router = new (Marionette.AppRouter.extend({
          appRoutes: this.routes,
          controller: this
        }))();
      }
      this._region = (options || {}).region;
      _.extend(this, _.pick(options || {}, 'region'));
      Module.__super__.constructor.apply(this, arguments);
    },

    start: function (options) {
      this.triggerMethod('before:start', options);
      this._running = true;
      this.triggerMethod('start', options);
    },

    stop: function (options) {
      this.triggerMethod('before:stop', options);
      this._running = false;
      this.triggerMethod('stop', options);
    },

    isRunning: function () {
      return this._running;
    },

    getRegion: function () {
      return this._region;
    }
  });

  return Module;
});
