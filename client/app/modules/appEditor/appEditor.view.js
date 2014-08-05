define(function (require) {
  var Module = require('lib/common/module'),
      channels = require('channels'),
      history = require('lib/util/history'),
      // link to layout directly instead of define layout here

  var AppEditorLayout = Marionett.Layout.extend({

    // template: need template

    regions: {
      appNavRegion: "#appNav-region",
      mainRegion: "#appMain-region" // Pretty sure I don't like this naming convention
    }

  });

  return AppEditorLayout
});
