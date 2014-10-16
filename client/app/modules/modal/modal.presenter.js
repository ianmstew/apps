define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ModalView = require('modules/modal/modal.view');
  var ModalLoadingView = require('modules/modal/modal-loading.view');

  var ModalPresenter = Presenter.extend({

    channelName: 'modal'

    /*
    onPresent: function () {
      var modalView = new ModalView();

      this.show(modalView, {
        loading: true,
        LoadingView: ModalLoadingView
      });
    }
    */
  });

  return ModalPresenter;
});
