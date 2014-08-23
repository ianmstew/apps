define(function (require) {
  var Radio = require('backbone.radio');

  Radio.DEBUG = true;

  _.each([
    'manager',
    'editor',
    'entities',
    'error'
  ], function (channelName) {
    Radio.tuneIn(channelName);
  });
});
