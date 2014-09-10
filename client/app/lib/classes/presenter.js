define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasPresenters = require('lib/mixin/has-presenters');
  var HasViewSingletons = require('lib/mixin/has-view-singletons');
  var Radio = require('backbone.radio');

  /*
   * A Presenter's purpose is to provide nestable presentation and data arbitration logic for views.
   * Not unlike this pattern: http://victorsavkin.com/post/49767352960/supervising-presenters.
   *
   * Features:
   *   - Required to own a region, which it will pass by default to child presenters
   *   - Required to own a channel, which it will pass by default to child presenters
   *   - Once a view is shown its lifecycle is tied to the view (destroyed when view is destroyed).
   *   - If show() is called with { loading: true }, a loading view will be automatically shown
   *     until the view's model and/or collection data is ready.
   *   - Convenience method viewFor() provides singleton access to view instances to helps avoid
   *     re-rendering views that are already visible.
   *
   * Defining a subclass:
   *   1. Implement onPresent() to handle display logic, data, and view instantiation.
   *        - Call this.show(view) to display view.
   *        - Call this.show(view, { loading: true }) to automatically manage a loading view.
   *   2. Implement onShow() to handle any logic that depends on the view's regions being
   *      available.
   *
   * Usage:
   *   1. Create a new Presenter or use an existing Presenter instance.
   *   2. Call presenter.present() with optional { region: <region> } override.
   */
  var Presenter = Marionette.Object.extend({

    region: null,
    _firstView: null,
    _options: null,

    constructor: function (options) {
      this._options = options;
      this.initializeMixins(options);
      Presenter.__super__.constructor.apply(this, arguments);
    },

    present: function (options) {
      var opts = _.defaults({}, options, this._options);
      this.region = opts.region;
      if (!this.region) throw new Error('Must supply a region');
      this.triggerMethod('before:present', opts);
      this.triggerMethod('present', opts);
    },

    show: function (view, options) {
      var opts = options || {};
      var nobind = opts.nobind;
      this.triggerMethod('before:show', view);

      if (!nobind) this._bindToView(view);

      if (opts.loading) {
        // Loading presentation requested; delegate showing to the loading presenter
        options.region = this.region;
        Radio.channel('loading').command('show:loading', view, options);
      } else {
        // Show into region directly
        this.region.show(view, options);
      }

      // View and its regions are instantiated and available even if loading view is shown first.
      // The loading presenter is responsible for ultimately showing into a region or destroying
      // the view, so children can reliably depend on view's regions to either be added to the DOM
      // or destroyed.  I.e., chaining onShow() to handle nested views is safe even while loading.
      this.triggerMethod('show', view);
    },

    _bindToView: function (view) {
      // Bind my lifetime to the first view shown
      this.listenTo(view, 'destroy', this.destroy);
      this._firstView = view;
    }
  });

  HasChannel.mixInto(Presenter);
  HasPresenters.mixInto(Presenter);
  HasViewSingletons.mixInto(Presenter);

  return Presenter;
});
