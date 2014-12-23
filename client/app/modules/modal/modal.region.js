define(function (require) {
  var Marionette = require('marionette');

  var ModalRegion = Marionette.Region.extend({

    modals: undefined,

    initialize: function () {
      this.modals = [];
    },

    show: function (view, options) {
      options = _.extend({}, options, { preventDestroy: true });
      view.once('destroy', this.onViewDestroy.bind(this, view));
      ModalRegion.__super__.show.call(this, view, options);
      this.modals.push(view);
    },

    attachHtml: function (view) {
      this.el.appendChild(view.el);
    },

    closeLast: function () {
      var last = this.modals.pop();
      last.destroy();
    },

    onViewDestroy: function (view) {
      // Ensure view is removed from array, in case it was removed by a method other than
      // closeLast()
      this.modals = _.without(this.modals, view);
    }
  });

  return ModalRegion;
});
