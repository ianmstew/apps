define(function (require) {
  var Module = require('lib/classes/module');
  var User = require('entities/user/user');
  var notifyUtil = require('modules/notify/notify.util');

  var AppEntities = Module.extend({

    channelName: 'app',

    channelEvents: {
      'user': ['reply', 'getUser']
    },

    user: undefined,

    initialize: function () {
      this.user = new User();
      notifyUtil.handleModelErrors(this, this.user);
      this.user.fetch();
    },

    getUser: function () {
      return this.user;
    }
  });

  return AppEntities;
});
