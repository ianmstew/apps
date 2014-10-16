define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/modal/modal.view');

  var ModalView = Marionette.ItemView.extend({

    channelName: 'modal',

    template: template,
    className: 'modal',

    // ajaxray Solution (2014) via github
    // Resource: https://gist.github.com/ajaxray/b245509903f107d8a47f
    events: {
      'click .close': function (e) {
        e.preventDefault();
        this.trigger('dialog:close');
      }
    }

    /*
    // Derek Bailey dialog solution (2012)
    // Article: http://lostechies.com/derickbailey/2012/04/17/managing-a-modal-dialog-with-backbone-and-marionette/
    constructor: function () {
      _.bindAll(this, 'showModal');
      Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
      this.on('view:show', this.showModal, this);
    },

    getEl: function (selector) {
      var $el = $(selector);
      $el.on('hidden', this.close);
      return $el;
    },

    showModal: function (view) {
      view.on('close', this.hideModal, this);
      this.$el.modal('show');
    },

    hideModal: function () {
      this.$el.modal('hide');
    }
    */

    // Joe Zim modal solution (2013)
    // Article: http://www.joezimjs.com/javascript/using-marionette-to-display-modal-views/
    /*
    constructor: function () {
      Marionette.Region.prototype.constructor.apply(this, arguments);

      this._ensureElement();
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
    */

    /*
    // v3 Modal Solution
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
