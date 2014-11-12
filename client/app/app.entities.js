define(function (require) {
  var Module = require('lib/classes/module');
  var CurrentUserModel = require('entities/user/current-user');
  var notifyUtil = require('modules/notify/notify.util');

  var AppEntities = Module.extend({

    channelName: 'app',

    channelEvents: {
      'user': ['reply', 'getUser']
    },

    user: null,

    initialize: function () {
      this.user = new CurrentUserModel();
      notifyUtil.handleModelErrors(this, this.user);
      this.user.fetch();
    },

    getUser: function () {
      return this.user;
    }
  });

  return AppEntities;
});
