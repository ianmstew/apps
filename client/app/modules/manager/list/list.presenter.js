define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var Radio = require('backbone.radio');
  var ListView = require('modules/manager/list/list.view');

  var ListPresenter = Presenter.extend({

    apps: null,

    initialize: function () {
      _.bindAll(this, 'appsReady');
    },

    show: function () {
      Radio.channel('entities').request('fetch:apps').then(this.appsReady);
    },

    appsReady: function (apps) {
      var listView = new ListView({
        collection: apps
      });
      this.channel.command('show:view', listView);
    }
  });

  return ListPresenter;
});
