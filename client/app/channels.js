define(function (require) {
  var Radio = require('backbone.radio');

  var channels = {
    appManager: Radio.channel('app-manager'),
    appEditor: Radio.channel('app-editor'),
    entities: Radio.channel('entities'),
    error: Radio.channel('error')
  };

  return channels;
});
