define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/services/child-views/service.view');

  var ServiceView = Marionette.ItemView.extend ({
    template: template,
    tagName: 'ul'
  });

  return ServiceView;
});
