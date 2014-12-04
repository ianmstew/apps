define(function (require) {
  var Radio = require('backbone.radio');

  var debugRadio = {

    tunedIn: {},

    enable: function () {
      Radio.DEBUG = true;

      // Tune into debug logging for all Radio channels
      Radio.channel = _.wrap(Radio.channel, function (channel, channelName) {
        if (!this.tunedIn[channelName]) {
          this.tunedIn[channelName] = true;
          Radio.tuneIn(channelName);
        }
        return channel.apply(this, _.rest(_.toArray(arguments)));
      }.bind(this));
    }
  };

  return debugRadio;
});
