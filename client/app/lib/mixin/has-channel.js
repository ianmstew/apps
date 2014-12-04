define(function (require, exports, module) {
  var Radio = require('backbone.radio');
  var logger = require('lib/util/logger')(module);

  var HasChannel = {

    // Declarative option for channel name
    channelName: null,

    // Declarative binding of channel events
    // { 'event': ['on|reply|comply', eventHandler] }
    channelEvents: null,

    // Current channel
    channel: null,

    initialize: function (options) {
      if (this.channelName) {
        this.channelName = this.channelName || (options || {}).channelName;
        this.channel = Radio.channel(this.channelName);
      }
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
  };

  return HasChannel;
});
