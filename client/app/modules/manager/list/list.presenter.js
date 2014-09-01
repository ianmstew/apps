define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var Radio = require('backbone.radio');
  var ListView = require('modules/manager/list/list.view');
  var AppsCollection = require('entities/app/apps.collection');

  var ListPresenter = Presenter.extend({

    apps: null,

    initialize: function () {
      _.bindAll(this, 'appsReady');
    },

    onPresent: function () {
      Radio.channel('entities').request('fetch:apps').then(this.appsReady);
    },

    appsReady: function (apps) {
      var listView = this.viewFor(ListView, {
        collection: new AppsCollection(apps)
      });
      this.show(listView);
    }
  });

  return ListPresenter;
});
