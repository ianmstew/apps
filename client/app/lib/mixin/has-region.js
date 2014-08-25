define(function (require) {

  var HasRegion = {

    _initialize: function (options) {
      this.region = (this.options || {}).region;
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

    mixInto: function (target) {
      _.extend(target, _.omit(this, '_initialize', 'mixInto'));
      this._initialize.call(target);
    }
  };

  return HasRegion;
});
