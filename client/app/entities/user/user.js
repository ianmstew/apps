define(function (require) {
  var Backbone = require('backbone');

  var User = Backbone.Model.extend({

    idAttribute: '_id',
    urlRoot: '/api/users',

    // Default user is currently logged in user
    url: function () {
      return this.urlRoot + '/' + (this.get('_id') || 'current') + '/';
    },

    defaults: {
      _id: undefined,      // {string} ID
      email: undefined,    // {string} Email
      isActive: undefined, // {string yes|no} Whether user is active (?)
      roles: undefined,    // {Object} User roles (admin or standard account)
                      // {
                      //   account: {Account ID}
                      //   admin: {Admin ID}
                      // }
      search: undefined,   // [{String}] Valid user names
      username: undefined, // {String} User name
    }
  });

  return User;
});
