define(function (require) {
  var Backbone = require('backbone'),
      appRadio = require('app.radio'),
      app = require('app'),
      API;

  API = {
    addInitializer: function (init) {
      app.addInitializer(init);
    },

    navigate: function (route, options) {
      Backbone.history.navigate(route, options);
    },

    getCurrentRoute: function () {
      return Backbone.history.fragment;
    },

    showHeader: function (view) {
      app.headerRegion.show(view);
    },

    showFooter: function (view) {
      app.footerRegion.show(view);
    },

    showContent: function (view) {
      app.contentRegion.show(view);
    }
  };

  appRadio.reqres.setHandler('get:current:route', API.getCurrentRoute);
  appRadio.commands.setHandler('navigate', API.navigate);
  appRadio.commands.setHandler('add:initializer', API.addInitializer);
  appRadio.commands.setHandler('show:header', API.showHeader);
  appRadio.commands.setHandler('show:footer', API.showFooter);
  appRadio.commands.setHandler('show:content', API.showContent);

  // No export--event API
});
