define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/notify/alert/alert.view');

  var AlertView = Marionette.ItemView.extend({
    
    template: template,

    templateHelpers: {
      severity: function () {
        switch (this.type) {
          case 'error':
            return 'danger';
          case 'warn':
            return 'warning';
          case 'info':
            return 'info';
          default:
            return 'info';
        }
      }
    },

    ui: {
      alert: '.js-alert'
    },

    events: {
      click: 'onClose'
    },

    onRender: function () {
      this.ui.alert.one('close.bs.alert', this.onClose.bind(this));
    },

    onBeforeShow: function () {
      this.ui.alert.addClass('in');
    },

    onClose: function () {
      if (this.model.collection) this.model.collection.remove(this.model);
    }
  });

  return AlertView;
});
