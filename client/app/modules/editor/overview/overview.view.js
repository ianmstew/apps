define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/overview/overview.view');

  var appOverviewView = Marionette.view.extend({

    template: template,

    /*
    regions: {
      //regionName: "#region",
    }
    */
  });

  return appOverviewView;
});
