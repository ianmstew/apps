define(function (require) {
  var Radio = require('backbone.radio');
  var logger = require('lib/util/logger');

  var HasChannel = {

    channelName: null,
    channel: null,

    mixinto: function (target) {
      this._intialize.call(target);
      this._registerChannelEvents.call(target);
    },

    _intialize: function () {
      this.channelName = this.channelName || (this.options || {}).channelName;
      this.channel = Radio.channel(this.channelName);
    },

    _registerChannelEvents: function () {
      var channelEvents = this.channelEvents || {};

      _.each(channelEvents, function (channelEvent, event) {
        var eventType = channelEvent[0];
        var eventHandler = _.bind(this[channelEvent[1]], this);

        switch (eventType) {
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
      }, this);
    }
  };

  return HasChannel;
});
