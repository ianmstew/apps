define(function (require) {
  var mode = require('lib/util/mode');

  // Mixin is a collection of static methods which can be extended
  function Mixin() {
    if (mode === 'dev') {
      throw new Error('Do not call Mixin with "new", rather extend it statically');
    }
  }

  _.extend(Mixin, {

    initialize: _.noop,

    augment: function (target) {
      // NOTE: In this context, "this" is the object of mixin methods, not a "new" instance.
      var conflicts;

      if (mode === 'dev') {
        conflicts = _.reduce(this, function (conflicts, value, property) {
          if (_.contains(target, property)) conflicts.push(property);
          return conflicts;
        }, []);
        if (conflicts.length) {
          throw new Error('Target contains mixin properties:' + JSON.stringify(conflicts));
        }
      }

      _.defaults(target, _.omit(this, 'initialize', 'augment'));
      this.initialize.call(target, target.options);
    },

    extend: function (mixinProps) {
      var child = {};
      return _.extend(child, Mixin, mixinProps);
    }
  });

  return Mixin;
});
