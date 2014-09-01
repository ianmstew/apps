define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasRegion = require('lib/mixin/has-region');
  var HasPresenters = require('lib/mixin/has-presenters');
  var HasViewSingletons = require('lib/mixin/has-view-singletons');

  /*
   * Presenter is a lightweight class that contains a Radio channel and manages a single region.
   * If belonging to a class that HasPresenters, this will inherit the owner's region and channel.
   */
  var Presenter = Marionette.Object.extend({

    constructor: function (options) {
      Presenter.__super__.constructor.apply(this, arguments);
      HasChannel.augment(this);
      HasRegion.augment(this);
      HasPresenters.augment(this);
      HasViewSingletons.augment(this);
    },

    present: function (options) {
      this.region = (options || {}).region || this.region;
      if (!this.region) throw new Error('Must supply a region');
      this.triggerMethod('before:present', options);
      this.triggerMethod('present', options);
    }
  });

  return Presenter;
});
