define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/modal/modal.layout');

  // Bootstrap-aware modal view
  var ModalView = Marionette.LayoutView.extend({

    channelName: 'modal',

    template: template,
    className: 'modal fade',

    hiding: undefined,

    regions: {
      modalBody: '.js-modal-body'
    },

    events: {
      'hide.bs.modal': 'onHide'
    },

    templateHelpers: function () {
      return {
        title: this.title,
        subtitle: this.subtitle
      };
    },

    initialize: function (options) {
      options = options || {};
      this.bodyView = options.bodyView;
      this.title = options.title || this.bodyView.title;
      this.subtitle = options.subtitle || this.bodyView.subtitle;
    },

    onHide: function () {
      this.hiding = true;
      this.destroy();
    },

    onBeforeShow: function () {
      // Bootstrap-show modal
      this.$el.modal({
        show: true,
        keyboard: true
      });

      this.getRegion('modalBody').show(this.bodyView);
    },

    destroy: function () {
      // Attach handler to Bootstrap "modal hidden" event
      // http://getbootstrap.com/javascript/#modals-usage
      this.$el.on('hidden.bs.modal', ModalView.__super__.destroy.bind(this));
      if (!this.hiding) this.$el.modal('hide');
    }
  });

  return ModalView;
});
