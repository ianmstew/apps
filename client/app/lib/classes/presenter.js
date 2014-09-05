define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasPresenters = require('lib/mixin/has-presenters');
  var HasViewSingletons = require('lib/mixin/has-view-singletons');
  var Radio = require('backbone.radio');

  /*
   * Presenter is a lightweight class that contains a Radio channel and manages a single region.
   * Features:
   * - Tied to the lifecycle of its default view; i.e., when its view is destroyed, so is the
   *   presenter.
   * - If created through HasPresenter's getPresenter(), it will inherit the owner's region and
   *   channel automatically.
   * - If show() is called with loading, a loading view will be shown until the view's model or
   *   collection data is ready.
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
        this.triggerMethod('show', view);
      }
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
