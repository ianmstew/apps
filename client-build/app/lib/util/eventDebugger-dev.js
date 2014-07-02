define(function (require) {
  var Wreqr = require('backbone.wreqr'),
      logger = require('lib/util/logger'),
      channels;

  channels = [
    'global',
    'dashboard',
    'appmgr'
  ];

  _.each(channels, function (channelName) {
    var channel = Wreqr.radio.channel(channelName);
    
    channel.vent.trigger = _.wrap(
      channel.vent.trigger,
      function (fn) {
        var originalArgs = Array.prototype.slice.call(arguments, 1);
        logger.debug(channelName + ' trigger', originalArgs);
        return fn.apply(channel.vent, originalArgs);
      });

    channel.reqres.request = _.wrap(
      channel.reqres.request,
      function (fn) {
        var originalArgs = Array.prototype.slice.call(arguments, 1),
            originalReturn = fn.apply(channel.reqres, originalArgs);
        logger.debug(channelName + ' request', originalArgs, 'Return:', originalReturn);
        return originalReturn;
      });

    channel.commands.execute = _.wrap(
      channel.commands.execute,
      function (fn) {
        var originalArgs = Array.prototype.slice.call(arguments, 1);
        logger.debug(channelName + ' execute', originalArgs);
        return fn.apply(channel.commands, originalArgs);
      });
  });
});
