define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/modal/modal.view');

  var ModalView = Marionette.ItemView.extend({

    channelName: 'modal',

    template: template,
    className: 'modal',

    // ajaxray Solution (2014) via github
    // Resource: https://gist.github.com/ajaxray/b245509903f107d8a47f
    events: {
      'click .close': function (e) {
        e.preventDefault();
        this.trigger('dialog:close');
      }
    }

    // Derek Bailey dialog solution (2012)
    // Article: http://lostechies.com/derickbailey/2012/04/17/managing-a-modal-dialog-with-backbone-and-marionette/

    // Joe Zim modal solution (2013)
    // Article: http://www.joezimjs.com/javascript/using-marionette-to-display-modal-views/
  });

  return ModalView;
});
