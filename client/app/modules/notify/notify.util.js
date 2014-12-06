define(function (require) {
  var Radio = require('backbone.radio');
  var notifyChannel = Radio.channel('notify');

  var notifyUtil = {

    handleModelErrors: function (owner, model) {
      owner.listenTo(model, 'error', function (model, resp) {
        notifyChannel.command('add:entityError', this.app, resp.statusText);
      });
    }
  };

  return notifyUtil;
});
