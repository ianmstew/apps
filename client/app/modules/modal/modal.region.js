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
  });

  return ModalRegion;
});
