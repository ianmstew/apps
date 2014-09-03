define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ListView = require('modules/manager/list/list.view');

  var ListPresenter = Presenter.extend({

    onPresent: function () {
      // Retrieve an apps model
      var apps = this.channel.request('apps');

      // Create/retrieve a view and attach a model
      var listView = this.viewFor(ListView, {
        collection: apps
      });

      // Show the view
      this.show(listView);

      // Trigger a model update
      apps.fetch();
    }
  });

  return ListPresenter;
});
