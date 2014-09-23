define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ListView = require('modules/manager/list/child-views/list.view');
  var GridItemLoadingView = require('modules/manager/list/child-views/grid-item-loading.view');

  var ListPresenter = Presenter.extend({

    channelName: 'manager',

    onPresent: function () {
      var apps = this.channel.request('apps');
      var listView = new ListView({
        collection: apps
      });

      this.show(listView, {
        loading: true,
        LoadingView: GridItemLoadingView
      });
    }
  });

  return ListPresenter;
});
