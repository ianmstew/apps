define(function (require) {
  var _Util = {
    origWrapArgs: function (wrapArgs) {
      return Array.prototype.slice.call(wrapArgs, 1);
    },
    yieldToWrapFn: function (wrapFn, wrapArgs, context) {
      return wrapFn.apply(context, this.origWrapArgs(wrapArgs));
    }
  };

  return _Util;
});
