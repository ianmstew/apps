define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var ModalLoadingView = require('modules/modal/modal-loading-view/modal-loading.view');

  var ModalPresenter = Presenter.extend({

    channelName: 'modal',

    onPresent: function (options) {
      this.show((options || {}).view, {
        loading: true,
        LoadingView: ModalLoadingView
      });
    }
  });

  return ModalPresenter;
});
