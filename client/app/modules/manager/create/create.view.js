define(function (require) {
  var Marionette = require('marionette');
  var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var template = require('hgn!modules/manager/create/create.view');
  var history = require('lib/util/history');

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
      var attrs = Syphon.serialize(this);
      var app = Radio.request('manager', 'new:app', attrs);
      if (!app.validationError) history.navigate('apps/', { trigger: true });
    }
  });

  return CreateView;
});
