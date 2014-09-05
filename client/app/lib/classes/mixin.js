define(function (require) {
  var mode = require('lib/util/mode');

  // Mixin is a collection of static methods which can be extended
  function Mixin() {
    if (mode === 'dev') {
      throw new Error('Do not call Mixin with "new", rather extend it statically');
    }
  }

  _.extend(Mixin, {

    // Mixin initializer provided by Mixin subclass
    initialize: _.noop,

    // List of all mixin initializers for this class
    _mixinInitializers: null,

    // Call all mixin initializers
    initializeMixins: function (options) {
      if (this._mixinsInitialized) return;

      _.each(this._mixinInitializers, function (mixinInitializer) {
        var initializer = mixinInitializer[0];
        var staticOptions = mixinInitializer[1];
        if (initializer) initializer.call(this, _.defaults({}, options, staticOptions));
      }, this);

      // Parasitic flag to ensure nested intitializations don't lead to duplicate calls
      this._mixinsInitialized = true;
    },

    // NOTE: Context "this" is the object of mixin methods, not a "new" instance.
    // 'staticOptions' are treated as defaults for instance initialize options at runtime.
    mixInto: function (Type, staticOptions) {
      // The destination prototype
      var prototype = Type.prototype;

      // Mix in all properties except for Mixin utilty methods
      var mixinProps = _.omit(this,
          'initialize', '_mixinInitializers', 'initializeMixins', 'mixInto', 'extend');

      // Mixin properties that already exist on destination prototype
      var conflicts;

      if (mode === 'dev') {
        conflicts = _.reduce(mixinProps, function (conflicts, value, property) {
          if (prototype[property] != null) conflicts.push(property);
          return conflicts;
        }, []);
        if (conflicts.length) {
          throw new Error('Target contains mixin properties:' + JSON.stringify(conflicts));
        }
      }

      // Prepare mixin initializers, merging if an existing array
      prototype.initializeMixins = this.initializeMixins;
      (prototype._mixinInitializers || (prototype._mixinInitializers = []))
        .push([this.initialize, staticOptions]);

      _.extend(prototype, mixinProps);
    },

    extend: function (mixinProps) {
      var child = {};
      return _.extend(child, Mixin, mixinProps);
    }
  });

  return Mixin;
});
