define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var CreateView = require('modules/manager/create/create.view');

  var CreatePresenter = Presenter.extend({

    initialize: function () {
    },

    show: function () {
      // show view immediately
      var createView = new CreateView();
      this.channel.command('show:view', createView);
    },
  });

  return CreatePresenter;
});
