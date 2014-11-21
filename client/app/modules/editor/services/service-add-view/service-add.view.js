define(function (require) {
  var Marionette = require('marionette');
  var ServiceDetailView = require('modules/editor/services/service-add-view/service-add-detail-view/service-add-detail.view');
  var template = require('hgn!modules/editor/services/service-add-view/service-add.view');

  var ServiceAddView = Marionette.LayoutView.extend ({
    template: template,

    initialize: function () {
      // var app = this.channel.request('app');
      this.title = 'Add '/* + this.model.get('services')*/;
      this.title += ' ' + 'Service';
      this.description = 'Select an option below to add your service:';
    },

    onRender: function () {
      var $title = $('<h4>', { text: this.title });
      var $description = $('<h5>', { text: this.description });
      this.$el.prepend($title, $description);
    },

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
