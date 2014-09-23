define(function (require) {

  /*
   * Manage a set of modules, passing down the owner's region and channel. All modules are created
   * only once, at initialization time.
   */
  var HasModules = {

    // Declarative set of modules
    // { 'moduleName': ModuleClass }
    modules: null,

    // Local storage of module instances
    _modules: null,

    initialize: function (options) {
      _.bindAll(this, 'destructModules', 'startModules', 'stopModules');
      var manualStart = (options || {}).manualStart;

      if (this.modules) {
        this.constructModules();
        if (!manualStart) this.on('start', this.startModules);
        this.on('destroy', this.destructModules);
        this.on('stop', this.stopModules);
      }
    },

    constructModules: function (modules) {
      this.destructModules();
      this._modules = _.chain(this.modules)
        .map(function (Module, name) {
          return [name, new Module()];
        }, this)
        .object()
        .value();
    },

    startModules: function (options) {
      _.invoke(_.values(this._modules), 'start', options);
    },

    stopModules: function (options) {
      _.invoke(_.values(this._modules), 'stop', options);
    },

    destructModules: function () {
      _.each(this._modules, function (module, name, modules) {
        module.destroy();
        modules[name] = null;
      });
      this._modules = null;
    },

    getModule: function (module) {
      return this._modules[module];
    }
  };

  return HasModules;
});
