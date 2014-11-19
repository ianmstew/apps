define(function (require) {
  var UserModel = require('entities/user/user');

  var CurrentUserModel = UserModel.extend({

    url: '/api/users/current',

    sync: function (method, model, options) {
      if (method !== 'read') throw new Error('Can only fetch the current user.');
      return CurrentUserModel.__super__.sync.apply(this, arguments);
    }
  });

  return CurrentUserModel;
});
