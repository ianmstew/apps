define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/loading/loading.view');

  var LoadingView = Marionette.ItemView.extend({
    template: template
  });

  return LoadingView;
});
