define(function (require) {
  var _ = require('underscore');

  function Logger (module) {
    if (!(this instanceof Logger)) return new Logger(module);
    this.moduleUri = module.uri;
    this.fileName = this.moduleUri.match(/(?:.*\/)?(.*)/)[1];
  }

  _.extend(Logger.prototype, {
    
    // AMD module's file name
    fileName: null,

    // AMD module's fully-qualified path
    moduleUri: null,

    _log: function (logger, logArgs) {
      console[logger].apply(console, ['['+this.fileName+']'].concat(_.toArray(logArgs)));
    },

    log: function () {
      if (Logger.enabled && Logger.modeIdx === 0) this._log('log', arguments);
    },

    debug: function () {
      if (Logger.enabled && Logger.modeIdx === 0) this._log('log', arguments);
    },

    info: function () {
      if (Logger.enabled && Logger.modeIdx <= 1) this._log('info', arguments);
    },

    warn: function () {
      if (Logger.enabled && Logger.modeIdx <= 2) this._log('warn', arguments);
    },

    error: function () {
      if (Logger.enabled && Logger.modeIdx <= 3) {
        if (arguments[0] instanceof Error) {
          this._log('error', [arguments[0].message, arguments[0].stack]);
        } else {
          this._log('error', arguments);
        }
      }
    }
  });

  _.extend(Logger, {

    // Current mode
    mode: null,

    // Mode index for quick mode inclusiveness comparisions
    modeIdx: null,
    
    // Possible modes
    modes: ['debug', 'info', 'warn', 'error'],

    // Whether logger is operational
    enabled: false,

    // Enable the logger with the specified mode.
    // Note that finer-grained modes include coarser modes; e.g., 'warn' implies 'error' but not
    // 'info' or 'debug'.
    enable: function (mode) {
      var _mode = mode || 'debug';
      var modeIdx = Logger.modes.indexOf(_mode);
      if (!~modeIdx) {
        throw new Error('Invalid mode: ' + mode);
      }
      Logger.enabled = true;
      Logger.mode = _mode;
      Logger.modeIdx = modeIdx;
    }
  });

  return Logger;
});
