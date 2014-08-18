define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history');
      template = require('hgn!modules/appEditor/appEditor.view');

  var AppEditorLayout = Marionett.Layout.extend({

    template: template;

    regions: {
      appNavRegion: "#appNav-region",
      mainRegion: "#appMain-region" // Pretty sure I don't like this naming convention
    }

  });

  return AppEditorLayout
});
