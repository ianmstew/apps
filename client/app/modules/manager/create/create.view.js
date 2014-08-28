define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/create/create.view');

  var CreateView = Marionette.CompositeView.extend({
    template: template,
    className: 'js-main-content'
  });

  return CreateView;
});
