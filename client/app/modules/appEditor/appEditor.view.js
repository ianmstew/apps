define(function (require) {
  var Module = require('lib/common/module'),
      template = require('hgn!modules/appEditor/appEditor.view');

  var AppEditorLayout = Marionett.Layout.extend({

    template: template,

    regions: {
      appNavRegion: "#appNav-region",
      mainRegion: "#appMain-region" // pref naming convention?
    }

  });

  return AppEditorLayout
});
