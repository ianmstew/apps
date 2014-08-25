define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/overview/overview.view');

  var OverviewView = Marionette.ItemView.extend({

    template: template
  });

  return OverviewView;
});
