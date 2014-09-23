define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OverviewView = require('modules/editor/overview/overview.view');

  var OverviewPresenter = Presenter.extend({

    onPresent: function () {
      var app = this.channel.request('app');
      var services = app.get('services');

      var overviewView = new OverviewView({
      });

      this.show(overviewView, { loading: true });
    }
  });

  return OverviewPresenter;
});
