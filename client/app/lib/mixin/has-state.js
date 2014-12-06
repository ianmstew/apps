define(function (require) {
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  var HasState = {

    // Default state attributes hash overridable by constructor 'state' option
    defaultState: undefined,

    // Backbone model maintaining state
    state: undefined,

    // Initial state attributes hash after defaults and constructor 'state' option are applied
    initialState: undefined,

    // options {
    //   state: {Model|attrs} Initial state
    // }
    initialize: function (options) {
      var state = (options || {}).state;

      if (state && state instanceof Backbone.Model) {
        this.state = state;
        this.initialState = _.clone(this.state.attributes);
      } else {
        this.initialState = _.defaults({}, state, this.defaultState);
        this.state = new Backbone.Model(this.initialState);
      }

      if (this.stateEvents) this._attachStateEvents();
      if (this.serializeData) this._wrapSerializeData();

      this.on('destroy', this._cleanupState.bind(this));
    },

    setState: function () {
      return this.state.set.apply(this.state, arguments);
    },

    getState: function () {
      return this.state.get.apply(this.state, arguments);
    },

    _attachStateEvents: function () {
      Marionette.bindEntityEvents(this, this.state, this.stateEvents);
    },

    _detachStateEvents: function () {
      Marionette.unbindEntityEvents(this, this.state, this.stateEvents);
    },

    _wrapSerializeData: function () {
      this.serializeData = _.wrap(this.serializeData, this._serializeDataWrapper);
    },

    _serializeDataWrapper: function (serializeData) {
      var data = serializeData.apply(this, _.rest(arguments));
      data.state = _.clone(this.state.attributes);
      return data;
    },

    resetState: function () {
      this.state.set(this.initialState, { unset: true });
    },

    _cleanupState: function () {
      if (this.stateEvents) this._detachStateEvents();
      this.state.stopListening();
      this.state = null;
    }
  };

  return HasState;
});
