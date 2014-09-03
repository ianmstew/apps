define(function (require) {
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  var eventedClasses = [
    Backbone.Model,
    Backbone.Collection,
    Marionette.Controller,
    Marionette.Object,
    Marionette.Region,
    Marionette.Behavior,
    Marionette.Application,
    Marionette.Module,
    Marionette.View
  ];

  function stopListeningWrapper (stopListening) {
    var origArgs = Array.prototype.slice.call(arguments, 1);
    this.stopComplying();
    this.stopReplying();
    return stopListening.apply(this, origArgs);
  }

  var RadioEvents = {
    _repliers: null,
    _compliers: null,

    complyWith: function (channel, command, complier) {
      channel.comply(command, _.bind(complier, this));
      this._compliers = this._compliers || [];
      this._compliers.push([channel, command]);
      return this;
    },

    replyWith: function (channel, request, replier) {
      channel.reply(request, _.bind(replier, this));
      this._repliers = this._repliers || [];
      this._repliers.push([channel, request]);
      return this;
    },

    stopComplying: function () {
      _.each(this._compliers, function (complier) {
        var channel = complier[0];
        var command = complier[1];
        channel.stopComplying(command);
      });
      return this;
    },

    stopReplying: function () {
      _.each(this._repliers, function (replier) {
        var channel = replier[0];
        var request = replier[1];
        channel.stopReplying(request);
      });
      return this;
    },

    stopListening: _.wrap(Backbone.Events.stopListening, stopListeningWrapper)
  };

  _.each(eventedClasses, function (eventedClass) {
    _.extend(eventedClass.prototype, RadioEvents);
  });
});