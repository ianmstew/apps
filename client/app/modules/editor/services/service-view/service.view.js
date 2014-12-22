define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-view/service.view');
  var ServiceEditView = require('modules/editor/services/service-edit-view/service-edit.view');
  var Radio = require('backbone.radio');

  var ServiceView = Marionette.ItemView.extend ({
    template: template,
    tagName: 'li',

    events: {
      'click': 'editMe'
    },

    modelEvents: {
      'change': 'render'
    },

    onRender: function () {
      console.log(this, this.model);
    },

    editMe: function () {
      var modalView = new ServiceEditView({
        model: this.model
      });
      Radio.channel('modal').command('show:modal', modalView);
    }
  });

  return ServiceView;
});
