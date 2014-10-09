define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/overlay/overlay.view');

  var OverlayView = Marionette.Region.extend({
    channelName: 'overlay',
    template: template,

    onShow: function (view) {
      this.listenTo(view, 'dialog:close', this.closeOverlay);
      var self = this;

      this.$el.dialog({
        modal: true,
        width: 'auto',
        close: function (e, ui) {
          self.closeDialog();
        }
      });
    },

    closeOverlay: function () {
      this.stopListening(); this.close(); this.$el.dialog('destroy');
    }
  });

  return OverlayView;
});
