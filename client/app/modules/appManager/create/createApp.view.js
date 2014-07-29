define(function (require) {
  var Marionette = require('marionette')

  var createAppView = Marionette.view.extend({
    template: template
  });

  return createAppView;
});
