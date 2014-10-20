define(function (require) {
  var Module = require('lib/classes/module');
  var ModalLayout = require('modules/modal/modal.layout');

  var ModalModule = Module.extend({

    channelName: 'modal',

    channelEvents: {
      'show:modal': ['comply', 'showModal']
    },

    showModal: function (view, options) {
      var modalLayout = new ModalLayout({
        bodyView: view
      });
      this.show(modalLayout);
    }
  });

  return ModalModule;
});
