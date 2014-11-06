define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-add-view/service-add-detail-view/service-add-detail.view');

  var ServiceAddDetailView = Marionette.ItemView.extend ({
    template: template
  });

  return ServiceAddDetailView;
});
