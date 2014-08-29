define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasRegion = require('lib/mixin/has-region');
  var HasPresenters = require('lib/mixin/has-presenters');

  /*
   * Presenter is a lightweight class that contains a Radio channel
   */
  var Presenter = Marionette.Object.extend({

    constructor: function (options) {
      Presenter.__super__.constructor.apply(this, arguments);
      HasChannel.mixinto(this);
      HasRegion.mixinto(this);
      HasPresenters.mixinto(this);
    }
  });

  return Presenter;
});
