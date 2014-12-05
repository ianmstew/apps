define(function (require, exports, module) {
  var Radio = require('backbone.radio');
  var logger = require('lib/util/logger')(module);

  var HasChannel = {

    // Declarative option for channel name
    channelName: undefined,

    // Declarative binding of channel events
    // { 'event': ['on|reply|comply', eventHandler] }
    channelEvents: undefined,

    // Current channel
    channel: undefined,

    getChannel: function () {
      return this.channel;
    },

    // options {
    //   channelName: {string} Backbone.Radio channel name
    // }
    initialize: function (options) {
      if (this.channelName) {
        this.channelName = (options || {}).channelName || this.channelName;
        this.channel = Radio.channel(this.channelName);
      }
      if (this.channelEvents) this._registerChannelEvents();
    },

    _registerChannelEvents: function (channelEvents) {
      _.each(this.channelEvents, this._registerChannelEvent, this);
    },

    _registerChannelEvent: function (channelHandler, event) {
      var eventType = channelHandler[0];
      var eventHandler = _.isString(channelHandler[1])
        ? this[channelHandler[1]]
        : channelHandler[1];

      if (!_.isFunction(eventHandler)) {
        throw new Error('Channel handler for "' + eventType +
          '" must be an inline function or an instance method');
      }

      switch (eventType) {
        case 'on':
          this.listenTo(this.channel, event, eventHandler);
          break;
        case 'reply':
          this.replyFor(this.channel, event, eventHandler);
          break;
        case 'comply':
          this.complyFor(this.channel, event, eventHandler);
          break;
        default:
          logger.warn(eventType + ' is not supported');
          break;
      }
    }
  };

  return HasChannel;
});
