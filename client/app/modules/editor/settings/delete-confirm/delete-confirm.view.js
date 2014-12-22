define(function (require) {
  var Marionette = require('marionette');
  // var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var template = require('hgn!modules/editor/settings/delete-confirm/delete-confirm.view');
  var history = require('lib/util/history');

  var DeleteConfirmView = Marionette.ItemView.extend ({
    template: template,
    className: 'delete-app-form',

    ui: {
      jsDeleteApp: '.js-delete-app'
    },

    events: {
      'click .btn-delete': 'deleteApplication'
    },

    deleteApplication: function () {
      Radio.command('editor', 'destroy:app');
      Radio.command('modal', 'close:modal');
      history.navigate('apps/', { trigger: true });
    }
  });

  return DeleteConfirmView;
});
