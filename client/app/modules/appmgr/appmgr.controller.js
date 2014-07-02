define(function (require) {
  var ModuleController = require('lib/module/module.controller'),
      history = require('lib/util/history'),
      AppmgrView = require('modules/appmgr/appmgr.view');

  var AppmgrController = ModuleController.extend({

    routes: {
      'appmgr': 'showAppmgr'
    },

    globalEvents: {
      vent: {
        'show:appmgr': 'showAppmgr'
      }
    },

    showAppmgr: function () {
      var view = new AppmgrView();
      this.mainRegion.show(view);
      history.navigate('appmgr');
    }
  });

  return AppmgrController;
});
