define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var LoadingView = require('modules/loading/loading.view');

  /*
   * Brian Mann's loading controller: http://www.backbonerails.com/screencasts/loading-views
   * Shows a loading view until the original view's model/collection are ready, then swaps.
   */
  var LoadingPresenter = Presenter.extend({

    _options: null,

    initialize: function (options) {
      _.bindAll(this, '_loaded');
    },

    onPresent: function (options) {
      var view = options.view;
      var LoadingViewType = options.loadingView || LoadingView;
      var loadingView = new LoadingViewType();

      // Gather entity promises
      var syncings = this._getSyncings(view);

      // Show loading view
      this.show(loadingView, { nodestroy: true });

      // When entities are ready, show original view
      Promise.all(syncings)
        .finally(_.partial(this._loaded, view, loadingView, options));
    },

    // Gather the 'syncing' promise from a view's model, collection, or both.
    // Relies upon lib/shim/backbone-syncing-state.
    _getSyncings: function (view) {
      return _.chain(view)
        .pick('model', 'collection')
        .pluck('syncing')
        .compact()
        .value();
    },

    _loaded: function (view, loadingView, options) {
      if (this.region.currentView !== loadingView) {
        // Another view besides the original has superseded the user. This means the user has
        // moved on before data returned, so the original view is outdated and should be discarded.
        view.destroy();
      } else {
        // Loading view still showing and data is back--swap it out for the original!
        options.silent = true;
        options.loading = false;
        if (!options.debug) this.show(view, options);
      }
    }
  });

  return LoadingPresenter;
});
