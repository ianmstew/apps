define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OverlayView = require('modules/overlay/overlay.view');
  var OverlayLoadingView = require('modules/overlay/overlay-loading.view');

  var OverlayPresenter = Presenter.extend({

    channelName: 'overlay',

    onPresent: function () {
      var overlayView = new OverlayView({
      });

      // I'm showing the list view immediately, but data could still be fetching.
      // If data is fetching, automatically show the GridItemLoadingView until it's ready.
      this.show(listView, {
        loading: true,
        LoadingView: OverlayLoadingView
      });
    }
  });

  return OverlayPresenter;
});
