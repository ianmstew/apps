define(function (require) {
  var EntityModule = require('lib/classes/entity.module');
  var CurrentUserModel = require('entities/user/current-user.model');

  var AppEntities = EntityModule.extend({

    channelEvents: {
      'user': ['reply', 'getUser']
    },

    entities: {
      'user': CurrentUserModel
    },

    initialize: function () {
      this.getEntity('user').fetch();
    },

    getUser: function () {
      return this.getEntity('user');
    }
  });

  return AppEntities;
});
