define(function (require) {
  var Wreqr = require('backbone.wreqr'),
      globalCh = new Wreqr.Channel('global');

  return globalCh;
});
