define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ListView = require('modules/manager/list/list.view');

  var ListPresenter = Presenter.extend({

    onPresent: function () {
      var apps = this.channel.request('apps');
      var listView = this.viewFor(ListView, {
        collection: apps
      });
      this.show(listView);
      apps.fetch();
    }
  });

  return ListPresenter;
});
