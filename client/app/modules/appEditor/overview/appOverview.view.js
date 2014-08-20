define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/appEditor/overview/appOverview.view');

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
