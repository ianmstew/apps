define(function (require) {
  var Marionette = require('marionette');
  var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var template = require('hgn!modules/editor/services/service-add-view/service-add-detail-view/service-add-detail.view');

  var ServiceAddDetailView = Marionette.ItemView.extend ({

    template: template,
    className: 'service-add-detail',

    templateHelpers: function () {
      return {
        type: this.type
      };
    },

    ui: {
      form: 'form'
    },

    events: {
      'submit @ui.form': 'onSubmit'
    },

    initialize: function (options) {
      this.type = this.model.get('type');
    },

    onAttach: function () {
      this.ui.form.parsley();
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      var attrs = Syphon.serialize(this);
      var service = Radio.request('editor', 'new:service', attrs);
      if (!service.validationError) Radio.command('modal', 'close:modal');
    }
  });

  return ServiceAddDetailView;
});
