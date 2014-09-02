define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var CurrentUserModel = require('entities/user/current-user.model');

  var AppEntities = EntityModule.extend({

    channelEvents: {
      'user': ['reply', 'getUser']
    },

    user: null,

    initialize: function () {
      this.user = this.entityFor(CurrentUserModel);
      this.user.fetch();
    },

    getUser: function () {
      return this.user;
    }
  });

  return AppEntities;
});
