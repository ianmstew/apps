define(function (require) {
  var Marionette = require('marionette');
  var ServiceDetailView = require('modules/editor/services/service-add-view/service-add-detail-view/service-add-detail.view');
  var template = require('hgn!modules/editor/services/service-add-view/service-add.view');

  var ServiceAddView = Marionette.LayoutView.extend ({
    template: template,

    ui: {
      serviceButtons: '.js-select-service'
    },

    regions: {
      serviceAddDetail: '.js-service-detail'
    },

    events: {
      'click .js-select-service': 'displayServiceDetail'
    },

    displayServiceDetail: function (evt) {
      var $btnTile = $(evt.target);
      var type = $btnTile.data('type');
      this.ui.serviceButtons.removeClass('selected');
      $btnTile.addClass('selected');
      var serviceDetailView = new ServiceDetailView({
        type: type
      });
      this.getRegion('serviceAddDetail').show(serviceDetailView);
    }
  });

  return ServiceAddView;
});
