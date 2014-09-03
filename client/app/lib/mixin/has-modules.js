define(function (require) {
  var Mixin = require('lib/classes/mixin');

  /*
   * Manage a set of modules, passing down the owner's region and channel.
   * Modules are constructed at initialize time unless { manualInitialize: true }, otherwise
   * constructModules() must be called manually. start/stop/destroy on owner cascade.
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
      var manualStart = (options || {}).manualStart;
      var manualInitialize = (options || {}).manualInitialize;

      if (this.modules) {
        if (!manualInitialize) this.constructModules();
        if (!manualStart) this.on('start', this.startModules);
        this.on('destroy', this.destructModules);
        this.on('stop', this.stopModules);
      }
    },

    constructModules: function (modules) {
      this.destructModules();
      this._modules = _.chain(this.modules)
        .map(this._constructModule, this)
        .object()
        .value();
    },

    _constructModule: function (Module, name) {
      return [name, new Module({
        region: this.region,
        channelName: this.channelName
      })];
    },

    startModules: function (options) {
      _.invoke(_.values(this._modules), 'start', options);
    },

    stopModules: function (options) {
      _.invoke(_.values(this._modules), 'stop', options);
    },

    destructModules: function () {
      this._modules = _.chain(this._modules)
        .map(this._destructModule, this)
        .object()
        .value();
      this._modules = null;
    },

    _destructModule: function (module, name) {
      module.destroy();
      return [name, null];
    },

    getModule: function (module) {
      return this._modules[module];
    }
  });

  return HasModules;
});
