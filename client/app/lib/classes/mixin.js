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
      _.invoke(this._mixinInitializers, 'call', this, options);
    },

    // NOTE: Context "this" is the object of mixin methods, not a "new" instance.
    mixInto: function (Type) {
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

      // Prepare mixin initializers
      prototype.initializeMixins = this.initializeMixins;
      (prototype._mixinInitializers || (prototype._mixinInitializers = []))
        .push(this.initialize);

      _.extend(prototype, mixinProps);
    },

    extend: function (mixinProps) {
      var child = {};
      return _.extend(child, Mixin, mixinProps);
    }
  });

  return Mixin;
});
