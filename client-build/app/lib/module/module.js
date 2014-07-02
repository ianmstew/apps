define(function (require) {
  var Marionette = require('marionette'),
      Module;

  Module = Marionette.Module.extend({
    startWithParent: false,
    controller: null,
    started: false,
    mainRegion: null,

    onStart: function (options) {
      if (this.started) return;
      options.module = this;
      this.controller = new this.moduleControllerClass(options);
      this.started = true;
    },

    onStop: function () {
      this.controller.close();
      this.controller = null;
      this.started = false;
    }
  });

  return Module;
});
