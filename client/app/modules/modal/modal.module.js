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
      options = options || {};
      this.lastModalView = new ModalLayout({
        bodyView: view,
        title: options.title,
        subtitle: options.subtitle
      });
      this.show(this.lastModalView);
    },

    closeModal: function () {
      this.getRegion().closeLast();
    }
  });

  return ModalModule;
});
