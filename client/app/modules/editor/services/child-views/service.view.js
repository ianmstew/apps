define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/child-views/service.view');

  var ServiceView = Marionette.ItemView.extend ({
    template: template,
    tagName: 'li',
    className: 'grid-item',

    ui: {
    },

    events: {
      'click button.service-edit': 'showServiceDetail'
    },

    showServiceDetail: function () {
      console.log('I will show the service overlay');
    }
  });

  return ServiceView;
});
