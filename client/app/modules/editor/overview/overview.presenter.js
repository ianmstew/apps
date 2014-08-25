define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OverviewView = require('modules/editor/overview/overview.view');

  var OverviewPresenter = Presenter.extend({

    onPresent: function () {
      var overviewView = new OverviewView();
      this.show(overviewView);
    }
  });

  return OverviewPresenter;
});
