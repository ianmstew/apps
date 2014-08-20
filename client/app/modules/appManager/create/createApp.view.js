define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appManager/create/createApp.view');

  var CreateAppView = Marionette.CompositeView.extend({
    template: template
  });

  return CreateAppView;
});
