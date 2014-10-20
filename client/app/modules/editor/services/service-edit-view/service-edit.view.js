define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-edit-view/service-edit.view');

  var ServiceView = Marionette.ItemView.extend ({
    template: template

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
