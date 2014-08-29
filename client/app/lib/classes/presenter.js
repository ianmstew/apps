define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasRegion = require('lib/mixin/has-region');
  var HasPresenters = require('lib/mixin/has-presenters');

  /*
   * Presenter is a lightweight class that contains a Radio channel and manages a single region.
   * If belonging to a class that HasPresenters, this will inherit the owner's region and channel.
   */
  var Presenter = Marionette.Object.extend({

    _singletons: null,

    constructor: function (options) {
      Presenter.__super__.constructor.apply(this, arguments);
      HasChannel.mixinto(this);
      HasRegion.mixinto(this);
      HasPresenters.mixinto(this);
      this._singletons = {};
    },

    viewSingleton: function (ViewType, options) {
      var view = this._singletons[ViewType];

      if (!view || view.isDestroyed) {
        view = new ViewType(options);
        this._singletons[ViewType] = view;
      }

      return view;
    },

    present: function (options) {
      this.region = (options || {}).region || this.region;
      if (!this.region) throw new Error('Must supply a region');
      this.triggerMethod('before:present', options);
      this.triggerMethod('present', options);
    }
  });

  return Presenter;
});
