define(function (require) {
  var ModuleController = require('lib/module/module.controller');

  var AppController = ModuleController.extend({

    initialize: function () {
      this.app = this.options.app;
    },

    appEvents: {
      commands: {
        'show:header':  'showHeader',
        'show:footer':  'showFooter',
        'show:content': 'showContent'
      }
    },

    showHeader: function (view) {
      this.app.headerRegion.show(view);
    },

    showFooter: function (view) {
      this.app.footerRegion.show(view);
    },

    showContent: function (view) {
      this.app.contentRegion.show(view);
    }
  });
 
  return AppController;
});
