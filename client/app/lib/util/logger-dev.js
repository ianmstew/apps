define(function (require) {
  var logger;

  logger = {

    debug: function () {
      console.debug.apply(console, arguments);
    },

    info: function () {
      console.info.apply(console, arguments);
    },

    warn: function () {
      console.warn.apply(console, arguments);
    },

    error: function () {
      console.error.apply(console, arguments);
    }
  };

  return logger;
});
