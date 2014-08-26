define(function (require) {
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  var HasState = {

    state: null,
    defaultState: null,
    initialState: null,

    _initialize: function (options) {
      var state = (options || {}).state;
      if (state && state instanceof Backbone.Model) {
        this.state = state;
      } else {
        this.initialState = _.defaults({}, state, this.defaultState);
        this.state = new Backbone.Model(this.initialState);
      }
      if (this.stateEvents) this._attachStateEvents();
      if (this.serializeData) this._wrapSerializeData();
    },

    _attachStateEvents: function () {
      Marionette.bindEntityEvents(this, this.state, this.stateEvents);
    },

    _wrapSerializeData: function () {
      this.serializeData = _.wrap(this.serializeData, this._serializeDataWrapper);
    },

    _serializeDataWrapper: function (serializeData) {
      var origArgs = Array.prototype.slice.call(this, 1);
      var data = serializeData.apply(this, origArgs);
      data.state = this.state.toJSON();
      return data;
    },

    resetState: function () {
      this.state.set(this.initialState);
    },

    mixinto: function (target) {
      _.defaults(target, _.omit(this, '_initialize', 'mixinto'));
      this._initialize.call(target, target.options);
    }
  };

  return HasState;
});
