define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/editor.view');

  var EditorView = Marionette.LayoutView.extend({

    template: template,

    regions: {
      appNavRegion: '#appNav-region',
      mainRegion: '#appMain-region' // pref naming convention?
    }
  });

  return EditorView;
});
