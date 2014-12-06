define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var EditorView = require('modules/editor/editor.view');
  var OverviewPresenter = require('modules/editor/overview/overview.presenter');
  var SettingsPresenter = require('modules/editor/settings/settings.presenter');
  var ServicesPresenter = require('modules/editor/services/services.presenter');

  var EditorPresenter = Presenter.extend({

    channelName: 'editor',

    tab: undefined,

    _editorView: undefined,

    modelEvents: {
      'change': 'render'
    },

    ui: {
      appName: '.js-app-name'
    },

    nameChanged: function (model, value, options) {
      this.ui.appName.text(value);
    },

    onPresent: function (options) {
      this.tab = (options || {}).tab;
      this.show(this.getEditorView());
    },

    onShow: function (editorView) {
      var contentRegion = editorView.getRegion('content');
      var presenter;

      switch (this.tab) {
        case 'overview':
          presenter = new OverviewPresenter({
            region: contentRegion
          });
          break;
        case 'services':
          presenter = new ServicesPresenter({
            region: contentRegion
          });
          break;
        case 'settings':
          presenter = new SettingsPresenter({
            region: contentRegion
          });
          break;
      }

      presenter.present();
      this.channel.trigger('show:tab', this.tab);
    },

    getEditorView: function () {
      if (!this._editorView || this._editorView.isDestroyed) {
        var app = this.channel.request('app');
        this._editorView = new EditorView({
          model: app
        });
      }
      return this._editorView;
    }
  });

  return EditorPresenter;
});
