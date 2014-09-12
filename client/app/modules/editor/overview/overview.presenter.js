define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OverviewView = require('modules/editor/overview/overview.view');

  var OverviewPresenter = Presenter.extend({

    onPresent: function () {
      // var app = this.channel.request('app');
      var overviewView = new OverviewView({
        /*
        model: app,
        collection: app.get('services')
        */
      });
      this.show(overviewView, { loading: true });
    }
  });

  return OverviewPresenter;
});
