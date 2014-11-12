define(function (require) {
  var Marionette = require('marionette');
  var ServiceDetailView = require('modules/editor/services/service-add-view/service-add-detail-view/service-add-detail.view');
  var template = require('hgn!modules/editor/services/service-add-view/service-add.view');

  var ServiceAddView = Marionette.LayoutView.extend ({
    template: template,
    /*
    childView: ServiceDetailView,
    childViewContainer: '.js-service-detail',
    */

    regions: {
      serviceAddDetail: 'js-service-detail'
    },

    events: {
      'click .js-select-service': 'displayServiceDetail'
    },

    displayServiceDetail: function () {
      // console.log('I display the service detail form!');
      var serviceDetailView = new ServiceDetailView();
      this.getRegion('serviceAddDetail').show(serviceDetailView);
    }
  });

  return ServiceAddView;
});
