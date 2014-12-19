define(function (require) {
  var Backbone = require('backbone');

  var history = {

    start: function () {
      Backbone.history.start();
    },

    navigate: function (route, options) {
      Backbone.history.navigate(route, options);
    },

    getCurrentRoute: function () {
      return Backbone.history.fragment;
    },

    on: function () {
      return Backbone.history.on.apply(Backbone.history, arguments);
    }
  };

  return history;
});
