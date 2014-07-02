define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appmgr/appmgr.view');

  var AppmgrView = Marionette.ItemView.extend({
    template: template
  });

  return AppmgrView;
});
