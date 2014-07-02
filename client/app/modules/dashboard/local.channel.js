define(function (require) {
  var Wreqr = require('backbone.wreqr');
  var localCh = Wreqr.radio.channel('dashboard');
  return localCh;
});
