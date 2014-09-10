define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ListView = require('modules/manager/list/child-views/apps.view');

  var ListPresenter = Presenter.extend({

    onPresent: function () {
      var apps = this.channel.request('apps');

      var appsView = this.viewFor(ListView, {
        collection: apps
      });

      this.show(appsView, { loading: true });
    }
  });

  return ListPresenter;
});
