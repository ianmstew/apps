define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/settings/settings.view');
  var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var history = require('lib/util/history');

  var SettingsView = Marionette.ItemView.extend({

    template: template,
    className: 'settings-tab',

    ui: {
      jsDeleteApp: '.js-delete-app'
    },

    events: {
      'click @ui.jsDeleteApp': 'deleteApplication',
      'submit form': 'onSubmit'
    },

    modelEvents: {
      'change': 'render'
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      var attrs = Syphon.serialize(this);
      Radio.command('editor', 'update:app', attrs);
      history.navigate('/apps/' + this.model.get('_id'), { trigger: true });
    },

    deleteApplication: function () {
      Radio.command('editor', 'destroy:app');
      history.navigate('/apps', { trigger: true });
    }
  });

  return SettingsView;
});
