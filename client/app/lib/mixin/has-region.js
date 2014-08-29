define(function (require) {

  var HasRegion = {

    region: null,

    _initialize: function (options) {
      this.region = (options || {}).region;
    },

    present: function (options) {
      this.region = (options || {}).region || this.region;
      this.triggerMethod('before:present', options);
      this.triggerMethod('present', options);
    },

    show: function (view, options) {
      this.triggerMethod('before:show', options);
      this.region.show(view, options);
      this.triggerMethod('show', options);
    },

    mixinto: function (target) {
      _.defaults(target, _.omit(this, '_initialize', 'mixinto'));
      this._initialize.call(target, target.options);
    }
  };

  return HasRegion;
});
