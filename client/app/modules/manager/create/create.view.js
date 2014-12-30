define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/create/create.view');
  var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var history = require('lib/util/history');

  var CreateView = Marionette.ItemView.extend({
    template: template,
    className: 'js-main-content',

    events: {
      'submit form': 'onSubmit'
    },

    onShow: function () {
      $('form').parsley();
      // disableSubmit();
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      var attrs = Syphon.serialize(this);
      Radio.command('editor', 'update:app', attrs);
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
