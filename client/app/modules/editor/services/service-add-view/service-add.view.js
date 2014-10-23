define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-add-view/service-add.view');

  var ServiceAddView = Marionette.ItemView.extend ({
    template: template
  });

  return ServiceAddView;
});
