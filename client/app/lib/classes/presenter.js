define(function (require) {
  var Marionette = require('marionette');
  var Radio = require('backbone.radio');

  /*
   * Presenter is a lightweight class that contains a Radio channel
   */
  var Presenter = Marionette.Object.extend({

    channelName: null,
    channel: null,

    constructor: function (options) {
      _.extend(this, _.pick(options || {}, 'channelName'));
      this.channel = Radio.channel(this.channelName);
      Presenter.__super__.constructor.apply(this, arguments);
    }
  });

  return Presenter;
});
