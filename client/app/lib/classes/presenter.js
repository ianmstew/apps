define(function (require) {
  var Marionette = require('marionette');
  var HasChannelMixin = require('lib/util/has-channel.mixin');

  /*
   * Presenter is a lightweight class that contains a Radio channel
   */
  var Presenter = Marionette.Object.extend({

    channelName: null,
    channel: null,

    constructor: function (options) {
      _.extend(this, _.pick(options || {}, 'channelName'));
      HasChannelMixin.mixinto(this);
      Presenter.__super__.constructor.apply(this, arguments);
    }
  });

  return Presenter;
});
