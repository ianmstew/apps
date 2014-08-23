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
      var args = Array.prototype.slice.call(arguments);
      var stack = new Error().stack.replace(/^Error/, '');
      console.warn.apply(console, args.concat(stack));
    },

    error: function () {
      var args = Array.prototype.slice.call(arguments);
      var stack = new Error().stack.replace(/^Error/, '');
      console.error.apply(console, args.concat(stack));
    }
  };

  return logger;
});
