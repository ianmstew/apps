define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var CreateView = require('modules/manager/create/create.view');

  var CreatePresenter = Presenter.extend({

    onPresent: function () {
      var createView = new CreateView();
      this.show(createView);
    }
  });

  return CreatePresenter;
});
