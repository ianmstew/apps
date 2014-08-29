define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/child-views/service.view');

  var ServiceView = Marionette.ItemView.extend({
    template: template,
    tagName: 'li'
  });

  return ServiceView;
});
