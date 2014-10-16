define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/modal/modal.view');

  var ModalRegion = Marionette.Region.extend({

    el: '#modal-region',

    onShow: function () {
      this.$el.modal('show');
    },

    onClose: function () {
      this.$el.modal('hide');
    }

    /*
    onShow: function (view) {
      this.listenTo(view, 'dialog:close', this.closeDialog);

      this.$el.modal({
        modal: true,
        show: true,
        width: 'auto',
        close: function (e, ui) {
          self.closeDialog();
        }
      });
    },

    closeDialog: function () {
      this.stopListening();
      this.close();
      this.$el.modal('hide');
    }
    */
  });

  return ModalRegion;
});
