define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/settings/settings.view');
  var Syphon = require('backbone.syphon');
  var DeleteConfirmView = require('modules/editor/settings/delete-confirm/delete-confirm.view');
  var Radio = require('backbone.radio');
  var history = require('lib/util/history');

  var SettingsView = Marionette.ItemView.extend({

    template: template,
    className: 'settings-tab',

    ui: {
      jsDeleteApp: '.js-delete-app',
      form: 'form'
    },

    events: {
      'click @ui.jsDeleteApp': 'deleteConfirm',
      'submit form': 'onSubmit'
    },

    modelEvents: {
      'change': 'render'
    },

    onShow: function () {
      this.ui.form.parsley();
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      var attrs = Syphon.serialize(this);
      Radio.command('editor', 'update:app', attrs);
      history.navigate('apps/' + this.model.get('_id') + '/', { trigger: true });
    },

    deleteConfirm: function () {
      var deleteConfirmView = new DeleteConfirmView();
      Radio.channel('modal').command('show:modal', deleteConfirmView);
    }
  });

  return SettingsView;
});
