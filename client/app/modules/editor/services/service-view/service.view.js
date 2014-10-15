define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-view/service.view');

  var ServiceView = Marionette.ItemView.extend ({
    template: template,
    tagName: 'li',
    className: 'grid-item'

    /*
    ui: {
      jsServiceInfo: '.service-info'
    },

    events: {
      'click @ui.jsServiceInfo': 'modalClicked'
    },

    modalClicked: function () {
      console.log('I will show the service overlay');
    }
    */
  });

  return ServiceView;
});
