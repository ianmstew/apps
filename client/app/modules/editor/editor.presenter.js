define(function (require) {
  var Presenter = require('lib/classes/presenter');
  var EditorView = require('modules/editor/editor.view');
  var OverviewPresenter = require('modules/editor/overview/overview.presenter');
  var SettingsPresenter = require('modules/editor/settings/settings.presenter');
  var ServicesPresenter = require('modules/editor/services/services.presenter');

  var EditorPresenter = Presenter.extend({

    presenters: {
      'overview': OverviewPresenter,
      'services': ServicesPresenter,
      'settings': SettingsPresenter
    },

    tab: null,
    editorView: null,

    onPresent: function (options) {
      this.tab = (options || {}).tab;
      this.editorView = this.viewFor(EditorView);
      this.show(this.editorView, options);
    },

    onShow: function (options) {
      this.channel.trigger('show:tab', this.tab);
      this.getPresenter(this.tab).present({
        region: this.editorView.getRegion('content')
      });
    }
  });

  return EditorPresenter;
});
