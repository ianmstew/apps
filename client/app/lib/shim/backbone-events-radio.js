define(function (require) {
  var Backbone = require('backbone');
  var _Util = require('lib/util/underscore-util');

  _.extend(Backbone.Events, {
    _repliers: null,
    _compliers: null,

    complyWith: function (channel, command, complier) {
      channel.comply(command, complier);
      this._compliers = this._compliers || [];
      this._compliers.push([channel, command]);
    },

    replyWith: function (channel, request, replier) {
      channel.reply(request, replier);
      this._repliers = this._repliers || [];
      this._repliers.push([channel, request]);
    },

    stopComplying: function () {
      _.each(this._compliers, function (complier) {
        var channel = complier[0];
        var command = complier[1];
        channel.stopComplying(command);
      });
    },

    stopReplying: function () {
      _.each(this._repliers, function (replier) {
        var channel = replier[0];
        var request = replier[1];
        channel.stopReplying(request);
      });
    }
  });

  function stopListeningWrapper (stopListening) {
    this.stopComplying();
    this.stopReplying();
    return _Util.yieldToWrapFn(stopListening, arguments, this);
  }

  Backbone.Events.stopListening = _.wrap(Backbone.Events.stopListening, stopListeningWrapper);
});
