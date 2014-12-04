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
      _id: null,      // {string} ID
      email: null,    // {string} Email
      isActive: null, // {string yes|no} Whether user is active (?)
      roles: null,    // {Object} User roles (admin or standard account)
                      // {
                      //   account: {Account ID}
                      //   admin: {Admin ID}
                      // }
      search: null,   // [{String}] Valid user names
      username: null, // {String} User name
    }
  });

  return User;
});
