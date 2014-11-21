define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/create/create.view');

  var CreateView = Marionette.CompositeView.extend({
    template: template,
    className: 'js-main-content',

    events: {
      'submit form': 'formSubmitted'
    },

    formSubmitted: function (e) {
      // Prevents the form from doing a default submit + page refresh
      e.preventDefault();

      // Gets all the name:value's for the forms elements with a "name"
      var data = Syphon.serialize(this);
      console.log('Create application form submitted!', data);
    }
  });

  return CreateView;
});
