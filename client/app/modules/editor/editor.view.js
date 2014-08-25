define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/editor.view');
  var HasState = require('lib/mixin/has-state');

  var EditorView = Marionette.LayoutView.extend({

    template: template,

    initialize: function () {
      HasState.mixInto(this);
    },

    regions: {
      tabs: '.js-editor-tabs',
      main: '.js-editor-main'
    }
  });

  return EditorView;
});
