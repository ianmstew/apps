define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasPresenters = require('lib/mixin/has-presenters');
  var HasViewSingletons = require('lib/mixin/has-view-singletons');
  var Radio = require('backbone.radio');

  /*
   * Presenter is a lightweight class that contains a Radio channel and manages a single region.
   * If belonging to a class that HasPresenters, this will inherit the owner's region and channel.
   *
   * Presenters are not lifecycle managed, except when included using HasPresenters, in which
   * case their lifecycle is tied to the owner. When using outside of HasPresenters, be sure to
   * call destroy() appropriately.
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
      this.triggerMethod('before:show', view);

      if (!this._firstView) this._bindToView(view);

      if ((options || {}).loading) {
        // Delegate showing into my region to the loading presenter
        options.region = this.region;
        Radio.channel('loading').command('show:loading', view, options);
      } else {
        // Show into region
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
