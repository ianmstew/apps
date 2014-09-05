define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var LoadingView = require('modules/loading/loading.view');

  var LoadingPresenter = Presenter.extend({

    _options: null,

    initialize: function (options) {
      _.bindAll(this, '_loaded');
    },

    onPresent: function (options) {
      var view = options.view;
      var loadingView = new LoadingView();
      var syncings = this._getSyncings(view);

      this.show(loadingView);

      Promise.all(syncings)
        .finally(_.partial(this._loaded, view, loadingView));
    },

    _getSyncings: function (view) {
      return _.chain(view)
        .pick('model', 'collection')
        .pluck('syncing')
        .compact()
        .value();
    },

    _loaded: function (view, loadingView) {
      if (this.region.currentView !== loadingView) {
        view.destroy();
      } else {
        this.show(view);
      }
    }
  });

  return LoadingPresenter;
});
