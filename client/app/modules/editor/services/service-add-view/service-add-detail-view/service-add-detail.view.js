define(function (require) {
  var Marionette = require('marionette');
  var Syphon = require('backbone.syphon');
  var Radio = require('backbone.radio');
  var template = require('hgn!modules/editor/services/service-add-view/service-add-detail-view/service-add-detail.view');

  var ServiceAddDetailView = Marionette.ItemView.extend ({

    template: template,

    templateHelpers: function () {
      return {
        type: this.type
      };
    },

    events: {
      'submit': 'onSubmit'
    },

    initialize: function (options) {
      this.type = (options || {}).type;
    },

    onShow: function () {
      $('form').parsley();
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
