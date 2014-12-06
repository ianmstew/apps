define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var LoadingView = require('modules/loading/loading.view');

  /*
   * Brian Mann's loading controller: http://www.backbonerails.com/screencasts/loading-views
   * Shows a loading view until the original view's model/collection are ready, then swaps.
   */
  var LoadingPresenter = Presenter.extend({

    view: undefined,
    LoadingView: undefined,

    initialize: function (options) {
      var opts = options || {};
      this.view = opts.view;
      this.LoadingView = opts.LoadingView || LoadingView;
    },

    onPresent: function (options) {
      var opts = options || {};
      var loadingView = new this.LoadingView();

      // Gather entity promises
      var syncings = this._getSyncings(this.view);

      // Show loading view
      this.show(loadingView, { noDestroy: true });

      // When entities are ready, show original view
      Promise.all(syncings).finally(this._loaded.bind(this, loadingView, opts));
    },

    _loaded: function (loadingView, options) {
      if (this.getRegion().currentView !== loadingView) {
        // Another view besides the original has superseded the user. This means the user has
        // moved on before data returned, so the original view is outdated and should be
        // discarded.
        this.view.destroy();
      } else {
        // Loading view still showing and data is back--swap it out for the original!
        options.silent = true;
        options.loading = false;
        if (!options.debug) this.show(this.view, options);
      }
    },

    // Gather the 'syncing' promise from a view's model, collection, or both.
    // Relies upon lib/shim/backbone-syncing-state.
    _getSyncings: function (view) {
      return _.chain(view)
        .pick('model', 'collection')
        .pluck('syncing')
        .compact()
        .value();
    }
  });

  return LoadingPresenter;
});
