define(function (require) {
  var Mixin = require('lib/classes/mixin');

  var HasRegion = Mixin.extend({

    // Current region
    region: null,

    initialize: function (options) {
      this.region = (options || {}).region;
    },

    show: function (view, options) {
      this.triggerMethod('before:show', options);
      this.region.show(view, options);
      this.triggerMethod('show', options);
    }
  });

  return HasRegion;
});
