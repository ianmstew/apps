define(function (require) {
  var Marionette = require('marionette');

  // Modal region designed to be subclassed to provide 'el' in context.
  // E.g., var modalRegion = ModalRegion.extend({ el: '<modal-region-el>' });
  var ModalRegion = Marionette.Region.extend({

    onShow: function (view) {
      // Attach handler to Bootstrap "modal hidden" event
      // http://getbootstrap.com/javascript/#modals-usage
      view.$el.on('hidden.bs.modal', this.modalHidden.bind(this));

      view.once('dialog:close', this.closeModal.bind(this));

      // Bootstrap-show modal
      view.$el.modal({
        show: true,
        keyboard: true,
        title: view.title
      });
    },

    // Close modal using Bootstrap's hide method
    closeModal: function () {
      this.currentView.$el.modal('hide');
    },

    // Once modal is hidden, throw out the view
    modalHidden: function () {
      this.empty();
    }
  });

  return ModalRegion;
});
