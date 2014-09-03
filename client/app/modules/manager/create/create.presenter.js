define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var CreateView = require('modules/manager/create/create.view');

  var CreatePresenter = Presenter.extend({

    onPresent: function () {
      this.show(this.viewFor(CreateView));
    }
  });

  return CreatePresenter;
});
