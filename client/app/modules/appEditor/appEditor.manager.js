define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels');
      //

  var AppEditorManager = Marionette.Object.extend({

    var appEditorLayout = new AppEditorModule.Layout();

    initialize: function () {
    },

  });

  return AppEditorManager;
});
