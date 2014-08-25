define(function (require) {
  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var _Util = require('lib/util/underscore-util');

  var HasState = {

    _initialize: function (options) {
      this.defaultState = _.extend(this.defaultState || {}, (this.options || {}).state);
      this.state = new Backbone.Model(this.defaultState);
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
      var data = _Util.yieldToWrapFn(serializeData, arguments, this);
      data.state = this.state.toJSON();
      return data;
    },

    resetState: function () {
      this.state.set(this.defaultState);
    },

    mixInto: function (target) {
      _.extend(target, _.omit(this, '_initialize', 'mixInto'));
      this._initialize.call(target);
    }
  };

  return HasState;
});
