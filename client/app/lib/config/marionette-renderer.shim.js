define(function (require) {
  var Marionette = require('marionette');

  // Override templating method to use hgn templates
  Marionette.Renderer.render = function (template, data) {
    return template(data);
  };
});
