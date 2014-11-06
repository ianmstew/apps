define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/modal/modal-loading-view/modal-loading.view');

  var ModalLoadingView = Marionette.ItemView.extend({
    template: template
  });

  return ModalLoadingView;
});
