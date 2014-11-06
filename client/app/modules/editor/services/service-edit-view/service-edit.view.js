define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-edit-view/service-edit.view');

  var ServiceEditView = Marionette.ItemView.extend ({
    template: template
  });

  return ServiceEditView;
});
