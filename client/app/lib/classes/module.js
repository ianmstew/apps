define(function (require) {
  var Marionette = require('marionette');
  var HasChannelMixin = require('lib/util/has-channel.mixin');

  /*
   * Module is a lightweight class that implements:
   *   - start/stop methods
   *   - a routes hash
   *   - ownership of a region passed via start() or new()
   * TODO: unregister routes for module that is stopped?
   */
  var Module = Marionette.Object.extend({

    isRunning: null,
    region: null,
    _router: null,
    _presenters: null,

    constructor: function (options) {
      Module.__super__.constructor.apply(this, arguments);
      _.extend(this, _.pick(options || {}, 'region', 'channelName'));
      HasChannelMixin.mixinto(this);
      this._constructRoutes(this.routes || {});
    },

    _constructRoutes: function (routes) {
      this._router = new (Marionette.AppRouter.extend({
        appRoutes: routes,
        controller: this
      }))();
    },

    _constructPresenters: function (presenters) {
      this._presenters = _.chain(presenters)
        .pairs()
        .map(function (pair) {
          var name = pair[0];
          var PresenterClass = pair[1];
          return [name, new PresenterClass({ channelName: this.channelName })];
        }, this)
        .reduce(function (presentersObj, pair) {
          var name = pair[0];
          var presenter = pair[1];
          presentersObj[name] = presenter;
          return presentersObj;
        }, {})
        .value();
    },

    _destructPresenters: function (presenters) {
      this._presenters = _.map(presenters, function (presenter) {
        presenter.destroy();
        return null;
      }, this);
    },

    getPresenter: function (presenter) {
      return this._presenters[presenter];
    },

    start: function (options) {
      this.triggerMethod('before:start', options);
      this._constructPresenters(this.presenters || {});
      this.isRunning = true;
      this.triggerMethod('start', options);
    },

    stop: function (options) {
      this.triggerMethod('before:stop', options);
      this._destructPresenters(this.presenters || {});
      this.isRunning = false;
      this.triggerMethod('stop', options);
    }
  });

  return Module;
});
