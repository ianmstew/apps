define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/modal/modal.layout');
  var ModalPresenter = require('modules/modal/modal.presenter');

  var ModalView = Marionette.LayoutView.extend({

    channelName: 'modal',

    template: template,
    className: 'modal fade',

    regions: {
      modalBody: '.js-modal-body'
    },

    events: {
      'click .close': function (e) {
        e.preventDefault();
        this.hide();
      }
    },

    hide: function () {
      this.trigger('dialog:close');
    },

    initialize: function (options) {
      this.bodyView = (options || {}).bodyView;
    },

    onShow: function () {
      new ModalPresenter({
        region: this.getRegion('modalBody'),
        view: this.bodyView,
        present: true
      });
    }
  });

  return ModalView;
});
