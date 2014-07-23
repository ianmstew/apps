define(function (require) {
  var Radio = require('backbone.radio');

  var channels = {
    appManager: Radio.channel('appManager'),
    appEditor: Radio.channel('appEditor'),
    entities: Radio.channel('entities')
  };

  return channels;
});
