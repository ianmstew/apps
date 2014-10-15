define(function (require) {
  var Module = require('lib/classes/module');
  var ModalPresenter = require('modules/modal/modal.presenter');

  var ModalModule = Module.extend({

    channelName: 'modal',

    channelEvents: {
      'show:modal': ['comply', 'showModal']
    },

    onStart: function () {
      // console.log('Modal overlay starts!');
    },

    showModal: function (view, options) {
      new ModalPresenter({
        region: this.getRegion(),
        present: true
      });
    }
  });

  return ModalModule;
});
