define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var Radio = require('backbone.radio');
  var Cocktail = require('backbone.cocktail');

  /*
   * A Presenter's purpose is to provide nestable presentation and data logic for views.
   * Not unlike this pattern: http://victorsavkin.com/post/49767352960/supervising-presenters.
   *
   * Features:
   *   - Has a region, accessible by getRegion() and used by show()
   *   - Has a channel
   *   - Once a view is shown its lifecycle is tied to the view (destroyed when view is destroyed).
   *   - If show() is called with { loading: true }, a loading view will be automatically shown
   *     until the view's model and/or collection data is ready.
   */
  var Presenter = Marionette.Object.extend({

    // My region
    region: undefined,

    // View whose destruction results in this Presenter destructing
    _boundView: undefined,

    constructor: function (options) {
      this.initialize = _.wrap(this.initialize, function (initialize, options) {

        // Call parent initialize first
        if (this.initialize !== Presenter.prototype.initialize) {
          Presenter.prototype.initialize.call(this, options);
        }

        // Call child initialize
        initialize.call(this, options);

        // Optionally call present() after all initialization
        if ((options || {}).present) this.present(options);
      });

      Presenter.__super__.constructor.apply(this, arguments);
    },

    initialize: function (options) {
      this.region = (options || {}).region;
    },

    present: function (options) {
      this.triggerMethod('before:present', options);
      this.triggerMethod('present', options);
    },

    getRegion: function () {
      return this.region;
    },

    // options: {
    //   loading:   {boolean} Whether to delegate to loading presenter
    //   silent:    {boolean} Whether to trigger 'show'
    //   noDestroy: {boolean} Whether to avoid destroying this Presenter on view destroy
    // }
    show: function (view, options) {
      var opts = options || {};

      if (!opts.silent) this.triggerMethod('before:show', view);
      if (!opts.noDestroy) this._bindToView(view);

      if (opts.loading) {
        // Loading presentation requested; delegate showing to the loading presenter
        Radio.channel('loading').command('show:loading', view, this.region, opts);
      } else {
        // Show into region directly
        this.region.show(view, opts);
      }

      // View and its regions are instantiated and available even if loading view is shown first.
      // The loading presenter is responsible for ultimately showing into a region or destroying
      // the view, so children can reliably depend on view's regions to either be added to the DOM
      // or destroyed.  I.e., chaining onShow() to handle nested views is safe even while loading.
      if (!opts.silent) this.triggerMethod('show', view, opts);
    },

    _bindToView: function (view) {
      if (!this._boundView) {
        // Bind my lifetime to the first view shown
        this.listenTo(view, 'destroy', this.destroy);
        this._boundView = view;
      }
    }
  });

  Cocktail.mixin(Presenter, HasChannel);

  return Presenter;
});
