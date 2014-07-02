define(function (require) {
  var Wreqr = require('backbone.wreqr');
  var localCh = Wreqr.radio.channel('appmgr');
  return localCh;
});
