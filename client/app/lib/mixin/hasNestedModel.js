define(function (require) {
  var Backbone = require('backbone');

  function HasNestedModel(model) {
    // parasitic extension
    model.__originalGet = model.get;
    model.__originalSet = model.set;
    model.__originalToJSON = model.toJSON;
    model.get = this.get;
    model.set = this.set;
    model._bubbleChange = this._bubbleChange;
    model.toJSON = this.toJSON;
  }

  _.extend(HasNestedModel.prototype, {

    /*
     * Backbone.Model.get() override that assumes dot-notation naming for nested models.
     * Accepts the same parameters as Backbone.Model.get().
     */
    get: function (key) {
      var dotIndex,
          modelKey,
          modelAttribute,
          model;

      // If period appears within key, assume a nested model
      if ((dotIndex = key.indexOf('.')) >= 0) {

        modelKey = key.substring(0, dotIndex);
        modelAttribute = key.substring(dotIndex + 1);

        model = this.get(modelKey);
        if (!(model instanceof Backbone.Model)) {
          throw new Error(modelKey + ' is not a Model');
        }

        return model.get(modelAttribute);
      } else {

        // Perform originally-defined get
        return this.__originalGet.apply(this, arguments);
      }
    },

    /*
     * Backbone.Model.set() override that sniffs out child Backbone Models and bubbles up events.
     * Accepts the same parameters as Backbone.Model.set().
     */
    set: function (key, val, options) {
      var self = this,
          attrs;
      if (key == null) return this;

      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // Iterate through each new attribute:value pair
      _.each(attrs, function (val, attr) {

        // If new attribute is a Backbone Model, set up event bubbling
        if (val instanceof Backbone.Model) {
          self._bubbleChange(attr, val, options)
        }
      });

      // Continue with original set behavior
      return this.__originalSet.apply(this, arguments);
    },

    _bubbleChange: function (attr, val, options) {
      var self = this,
          childName = attr,
          childModel = val,
          silent = options && options.silent;

      // Must listen to all events to capture property changes as well
      this.listenTo(childModel, 'all', function (childEvent) {
        var changePrefix = 'change',
            changeSuffix,
            eventArgs,
            event;

        // If I'm a change event, prefix my name and bubble up
        if (childEvent.indexOf(changePrefix) === 0) {

          if (childEvent.length > changePrefix.length) {
            changeSuffix = childEvent.substring(changePrefix.length + 1);
          }

          eventArgs = Array.prototype.slice.call(arguments, 1);
          event = changePrefix + ':' + childName + (changeSuffix ? ':' + changeSuffix : '');

          if (!silent) {
            self.trigger.apply(self, [event].concat(eventArgs));
            // Only fire 'change' after child fires 'change'.
            // A changeSuffix implies the child has not yet fired a top-level 'change'.
            if (!changeSuffix) self.trigger('change', self, options);
          }
        }
      });
    },

    toJSON: function (options) {
      var attrs = this.__originalToJSON(options);
      _.each(attrs, function (obj, idx) {
        if (obj instanceof Backbone.Model) {
          attrs[idx] = obj.toJSON();
        }
      });
      return attrs;
    }
  });

  return HasNestedModel;
});
