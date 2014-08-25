define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OverviewView = require('modules/editor/overview/overview.view');

  var OverviewPresenter = Presenter.extend({

    show: function () {
      var overviewView = new OverviewView();
      this.region.show(overviewView);
    }
  });

  return OverviewPresenter;
});
