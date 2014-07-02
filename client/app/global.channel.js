define(function (require) {
  var Wreqr = require('backbone.wreqr');
  var globalCh = Wreqr.radio.channel('global');
  return globalCh;
});
