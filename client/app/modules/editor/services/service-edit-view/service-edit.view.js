define(function (require) {
  var Marionette = require('marionette');
  var Syphon = require('backbone.syphon');
  var DeleteConfirmView = require('modules/editor/services/service-edit-view/delete-confirm/delete-confirm.view');
  var Radio = require('backbone.radio');
  var template = require('hgn!modules/editor/services/service-edit-view/service-edit.view');

  var ServiceEditView = Marionette.ItemView.extend ({
    template: template,

    className: 'service-edit-form',

    ui: {
      form: 'form'
    },

    events: {
      'submit @ui.form': 'formSubmitted',
      'click .js-remove-service': 'deleteConfirm'
    },

    onAttach: function () {
      this.ui.form.parsley();
    },

    formSubmitted: function (e) {
      // Prevents the form from doing a default submit + page refresh
      e.preventDefault();

      // Gets all the name:value's for the forms elements with a "name"
      var attrs = Syphon.serialize(this);
      Radio.command('editor', 'update:service', this.model, attrs);
      if (!this.model.validationError) Radio.command('modal', 'close:modal');
    },

    deleteConfirm: function () {
      var deleteConfirmView = new DeleteConfirmView({ model: this.model });
      this.listenToOnce(deleteConfirmView, 'remove:service', this.onRemoveService);
      Radio.channel('modal').command('show:modal', deleteConfirmView);
    },

    onRemoveService: function () {
      Radio.command('editor', 'destroy:service', this.model);
      Radio.command('modal', 'close:modal');
    }
  });

  return ServiceEditView;
});
