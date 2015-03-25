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

    editMe: function () {
      var modalView = new ServiceEditView({
        model: this.model
      });
      Radio.command('modal', 'show:modal', modalView, {
        title: 'Edit ' + this.model.get('name') + ' Settings',
        subtitle: 'View and edit your settings below:'
      });
    }
  });

  return ServiceView;
});
