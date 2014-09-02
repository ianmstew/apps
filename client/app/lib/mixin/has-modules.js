define(function (require) {
  var Mixin = require('lib/classes/mixin');

  /*
   * Manage a set of modules, passing down the owner's region and channel.
   */
  var HasModules = Mixin.extend({

    // Declarative set of modules
    // modules: {
    //   'moduleName': ModuleClass
    // },

    // Local storage of module instances
    _modules: null,

    initialize: function (options) {
      _.bindAll(this, 'destructModules', '_constructModule', 'startModules', 'stopModules');

      if (this.modules) {
        this.constructModules();
        this.on('destroy', this.destructModules);
        this.on('start', this.startModules);
        this.on('stop', this.stopModules);
      }
    },

    constructModules: function (modules) {
      this.destructModules();
      this._modules = {};
      _.each(this.modules, this._constructModule, this);
    },

    _constructModule: function (Module, name) {
      this._modules[name] = new Module({
        region: this.region,
        channelName: this.channelName
      });
    },

    startModules: function () {
      _.invoke(_.values(this._modules), 'start');
    },

    stopModules: function () {
      _.invoke(_.values(this._modules), 'stop');
    },

    destructModules: function () {
      _.each(this._modules, function (module, name) {
        module.destroy();
        this._modules[name] = null;
      }, this);
      this._modules = null;
    },

    getModule: function (module) {
      return this._modules[module];
    }
  });

  return HasModules;
});
