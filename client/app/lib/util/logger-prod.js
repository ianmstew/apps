define(function (require) {
  var logger;

  logger = {

    debug: function () {
      $.noop();
    },

    info: function () {
      $.noop();
    },

    warn: function () {
      $.noop();
    },

    error: function () {
      $.noop();
    }
  };

  return logger;
});
