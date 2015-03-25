define(function (require) {
  var Marionette = require('marionette');
  var Radio = require('backbone.radio');
  var template = require('hgn!modules/editor/services/service-edit-view/delete-confirm/delete-confirm.view');

  var DeleteConfirmView = Marionette.ItemView.extend ({
    template: template,
    className: 'delete-service-form',

    events: {
      'click .js-confirm': 'onConfirm'
    },

    onConfirm: function () {
      this.trigger('confirm');
      Radio.command('modal', 'close:modal');
    }
  });

  return DeleteConfirmView;
});
