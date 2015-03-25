define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/create/create.view');
  var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var history = require('lib/util/history');

  var CreateView = Marionette.ItemView.extend({
    template: template,
    className: 'js-main-content',

    ui: {
      form: 'form'
    },

    events: {
      'submit @ui.form': 'onSubmit'
    },

    onAttach: function () {
      this.ui.form.parsley();
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      var attrs = Syphon.serialize(this);
      Radio.request('manager', 'new:app', attrs);
      history.navigate('apps/', { trigger: true });
    },

    disableSubmit: function () {
      this.getElementById("tos-checkbox").disabled = true;
    },

    activateButton: function (element) {
      if(element.checked) {
        this.getElementById("tos-checkbox").disabled = false;
      }
      else  {
        this.getElementById("tos-checkbox").disabled = true;
      }
    }
  });

  return CreateView;
});
