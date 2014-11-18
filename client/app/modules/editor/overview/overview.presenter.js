define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OverviewView = require('modules/editor/overview/overview.view');

  var OverviewPresenter = Presenter.extend({

    channelName: 'editor',

    onPresent: function () {
      var app = this.channel.request('app');
      var overviewView = new OverviewView({
        model: app,
        collection: app.services
      });
      this.show(overviewView, { loading: true });
    }
  });

  return OverviewPresenter;
});
