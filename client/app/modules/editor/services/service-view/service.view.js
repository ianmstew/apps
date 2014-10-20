define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-view/service.view');
  var ServiceEditView = require('modules/editor/services/service-edit-view/service-edit.view');
  var Radio = require('backbone.radio');

  var ServiceView = Marionette.ItemView.extend ({
    template: template,
    tagName: 'li',
    className: 'grid-item',

    ui: {
      serviceInfo: '.service-info'
    },

    events: {
      'click @ui.serviceInfo': 'editMe'
    },

    editMe: function () {
      var modalView = new ServiceEditView({
        model: this.model
      });
      Radio.channel('modal').command('show:modal', modalView);
    }

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
