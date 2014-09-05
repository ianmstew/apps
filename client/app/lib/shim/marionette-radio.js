define(function (require) {
  var Marionette = require('marionette');
  var Radio = require('backbone.radio');

  Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'app';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  };
});
