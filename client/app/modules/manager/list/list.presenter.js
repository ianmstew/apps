define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ListView = require('modules/manager/list/list.view');
  var GridItemLoadingView = require('modules/manager/list/grid-item-view/grid-item-loading.view');

  var ListPresenter = Presenter.extend({

    // This allows 'this.channel' to be available, and "tuned in" to 'manager'
    channelName: 'manager',

    // Get the shared Apps collection, create a CollectionView with it, then show the view
    onPresent: function () {
      var apps = this.channel.request('apps');
      var listView = new ListView({
        collection: apps
      });

      // I'm showing the list view immediately, but data could still be fetching.
      // If data is fetching, automatically show the GridItemLoadingView until it's ready.
      this.show(listView, {
        loading: true,
        LoadingView: GridItemLoadingView
      });
    }
  });

  return ListPresenter;
});
