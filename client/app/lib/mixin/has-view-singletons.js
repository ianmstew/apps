define(function (require) {
  var Mixin = require('lib/classes/mixin');

  var HasViewSingletons = Mixin.extend({

    // Hash of view singletons
    _views: null,

    initialize: function (options) {
      _.bindAll(this, '_cleanupViews');
      this._views = {};
      this.on('destroy', this._cleanupViews);
    },

    // Returns a view singleton so that a visible view isn't destructed only to be re-created
    viewFor: function (ViewType, options) {
      var view = this._views[ViewType];

      if (!view || view.isDestroyed) {
        view = new ViewType(options);
        this._views[ViewType] = view;
      } else if ((options || {}).state && view.setState) {
        // Support state-aware views
        view.setState(options.state);
      }

      return view;
    },

    _cleanupViews: function () {
      _.each(this._views, function (view, name) {
        if (view && !view.isDestroyed) view.destroy();
        this._views[name] = null;
      });
      this._views = null;
    }
  });

  return HasViewSingletons;
});
