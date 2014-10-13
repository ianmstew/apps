define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/modal/modal.view');

  var ModalView = Marionette.Region.extend({
    channelName: 'modal',
    template: template,

    constructor: function () {
      Marionette.Region.prototype.constructor.apply(this, arguments);

      this.ensureEl();
      this.$el.on('hidden', {
        region:this
      },
      function (event) {
        event.data.region.close();
      });
    },

    onShow: function () {
      this.$el.modal('show');
    },

    onClose: function () {
      this.$el.modal('hide');
    }

    /*
    onShow: function (view) {
      this.listenTo(view, 'dialog:close', this.closeModal);
      var self = this;

      this.$el.dialog({
        modal: true,
        width: 'auto',
        close: function (e, ui) {
          self.closeDialog();
        }
      });
    },

    closeModal: function () {
      this.stopListening(); this.close(); this.$el.dialog('destroy');
    }
    */
  });

  return ModalView;
});
