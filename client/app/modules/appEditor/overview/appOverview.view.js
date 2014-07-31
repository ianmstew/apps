define(function (require) {
  var Marionette = require('marionette');

  var appOverviewView = Marionette.view.extend({
    template: template
  });

  return appOverviewView;
});
