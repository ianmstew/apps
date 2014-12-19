define(function (require) {
  var Module = require('lib/classes/module');
  var ModalLayout = require('modules/modal/modal.layout');

  var ModalModule = Module.extend({

    channelName: 'modal',

    lastModalView: undefined,

    channelEvents: {
      'show:modal': ['comply', 'showModal'],
      'close:modal': ['comply', 'closeModal']
    },

    showModal: function (view, options) {
      this.lastModalView = new ModalLayout({
        bodyView: view
      });
      this.show(this.lastModalView);
    },

    closeModal: function () {
      if (this.lastModalView && !this.lastModalView.isDestroyed) {
        this.lastModalView.hide();
      }
    }
  });

  return ModalModule;
});
