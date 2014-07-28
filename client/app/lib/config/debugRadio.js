define(function (require) {
  var Radio = require('backbone.radio'),
      channels = require('channels');
  
  Radio.DEBUG = true;

  _.each(channels, function (channel, channelKey) {
    Radio.tuneIn(channelKey);
  });
});
