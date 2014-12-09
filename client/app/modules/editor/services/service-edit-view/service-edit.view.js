define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/service-edit-view/service-edit.view');

  var ServiceEditView = Marionette.ItemView.extend ({
    template: template,

    className: 'service-edit-form',

    events: {
      'submit form': 'formSubmitted'
    },

    initialize: function () {
      // var app = this.channel.request('app');
      this.title = 'Edit '/* + this.model.get('services')*/;
      this.title += ' ' + 'Settings';
      this.description = 'View and edit your settings below:';
    },

    onRender: function () {
      var $title = $('<h4>', { text: this.title });
      var $description = $('<h5>', { text: this.description });
      this.$el.prepend($title, $description);
    },

    formSubmitted: function (e) {
      // Prevents the form from doing a default submit + page refresh
      e.preventDefault();

      // Gets all the name:value's for the forms elements with a "name"
      var data = Syphon.serialize(this);
      console.log('Edit service form submitted!', data);
    }
  });

  return ServiceEditView;
});
