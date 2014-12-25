define(function (require) {
  var Marionette = require('marionette');
  // var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var template = require('hgn!modules/editor/services/service-edit-view/delete-confirm/delete-confirm.view');
  var history = require('lib/util/history');

  var DeleteConfirmView = Marionette.ItemView.extend ({
    template: template,
    className: 'delete-service-form',

    events: {
      'click .btn-delete': 'onClickRemoveService'
    },

    onClickRemoveService: function () {
      Radio.command('editor', 'destroy:service');
      Radio.command('modal', 'close:modal');
      history.navigate('apps/' + this.model.get('_id') + '/services/', { trigger: true });
    }
  });

  return DeleteConfirmView;
});
