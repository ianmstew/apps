define(function (require) {
  var Mixin = require('lib/classes/mixin');
  var Radio = require('backbone.radio');
  var logger = require('lib/util/logger');

  var HasChannel = Mixin.extend({

    // Declarative option for channel name
    // channelName: nameOfChannel

    // Declarative binding of channel events
    // channelEvents: {
    //   'event': ['on|reply|comply', eventHandler]
    // }

    // Current channel
    channel: null,

    initialize: function (options) {
      this.channelName = this.channelName || (options || {}).channelName;
      this.channel = Radio.channel(this.channelName);
      if (this.channelEvents) this._registerChannelEvents();
    },

    _registerChannelEvents: function (channelEvents) {
      _.each(this.channelEvents, this._registerChannelEvent, this);
    },

    _registerChannelEvent: function (channelHandler, event) {
      var eventType = channelHandler[0];
      var eventHandler = this[channelHandler[1]];

      switch (eventType) {
        case 'on':
          this.listenTo(this.channel, event, eventHandler);
          break;
        case 'reply':
          this.replyWith(this.channel, event, eventHandler);
          break;
        case 'comply':
          this.complyWith(this.channel, event, eventHandler);
          break;
        default:
          logger.warn(eventType + ' is not supported');
          break;
      }
    }
  });

  return HasChannel;
});
