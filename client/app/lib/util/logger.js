define(function (require) {
  var mode = require('lib/util/mode');
  var logger;

  if (mode === 'dev') {

    logger = {

      debug: function () {
        console.debug.apply(console, arguments);
      },

      info: function () {
        console.info.apply(console, arguments);
      },

      warn: function () {
        var args = _.toArray(arguments);
        var stack = new Error().stack.replace(/^Error/, '');
        console.warn.apply(console, args.concat(stack));
      },

      error: function () {
        var args = _.toArray(arguments);
        var stack = new Error().stack.replace(/^Error/, '');
        console.error.apply(console, args.concat(stack));
      }
    };
  } else {

    logger = {

      debug: _.noop,
      info: _.noop,
      warn: _.noop,
      error: _.noop
    };
  }

  return logger;
});
