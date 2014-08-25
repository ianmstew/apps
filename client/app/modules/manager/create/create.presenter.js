define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var CreateView = require('modules/manager/create/create.view');

  var CreatePresenter = Presenter.extend({

    show: function () {
      var createView = new CreateView();
      this.region.show(createView);
    }
  });

  return CreatePresenter;
});
