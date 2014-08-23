define(function (require) {
  var _Util = {
    origWrapArgs: function (wrapArgs) {
      return Array.prototype.slice.call(wrapArgs, 1);
    }
  };

  return _Util;
});
