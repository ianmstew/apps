define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var OverlayView = require('modules/overlay/overlay.view');

  var OverlayPresenter = Presenter.extend({

    onPresent: function () {
      var overlayView = new OverlayView();
      this.show(overlayView);
    },

    onShow: function (overlayView) {
      this.getPresenter.present({
        region: overlayView.getRegion('overlay')
      });
    }
  });

  return OverlayPresenter;
});
