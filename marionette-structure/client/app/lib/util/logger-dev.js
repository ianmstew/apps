define(function (require) {
  var logger;

  logger = {

    _log: function (prefix, args) {
      if (args.length === 1 && _.isString(args[0])) {
        console.log(prefix + ' ' + args[0]);
      } else {
        args = Array.prototype.slice.call(args, 0);
        console.log.apply(console, [prefix].concat(args));
      }
    },

    debug: function () {
      this._log('DEBUG:', arguments);
    },

    info: function () {
      this._log('INFO: ', arguments);
    },

    warn: function () {
      this._log('WARN: ', arguments);
    },

    error: function () {
      this._log('ERROR:', arguments);
      throw new Error(arguments[0].toString());
    }
  };

  return logger;
});
