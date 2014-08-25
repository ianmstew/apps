define(function (require) {

  var HasRegion = {

    _initialize: function (options) {
      this.region = this.region || (this.options || {}).region;
    },

    mixInto: function (target) {
      this._initialize.call(target);
    }
  };

  return HasRegion;
});
