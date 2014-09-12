define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ListView = require('modules/manager/list/list.view');

  var ListPresenter = Presenter.extend({

    listView: null,

    onPresent: function () {
      // Retrieve an apps model
      var apps = this.channel.request('apps');

      // Create and show the view
      var listView = new ListView({
        collection: apps
      });
      this.show(listView, { loading: true });

      // Trigger a model update
      apps.fetch();
    }
  });

  return ListPresenter;
});
