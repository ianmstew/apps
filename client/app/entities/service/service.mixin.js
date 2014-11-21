define(function (require) {
  var ComputedFields = require('backbone.computedfields');

  // This is the "Base Service" that sets shared properties on any specific service
  var ServiceMixin = {

    idAttribute: '_id',

    defaults: {
      _id: null,
      app: null,  // Owning app id
      type: null, // Keyable service type; e.g., 'facebook' or 'twitter'

      // Computed
      dateAdded: null,

      // Read only
      connectionData: null,
      createdAt: null, // TODO: Not yet implemented on server
      owner: null,

      // View only
      iconClass: null,
      name: null
    },

    computed: {
      dateAdded: {
        depends: ['createdAt'],
        get: function (fields) {
          // TODO: Return a pretty-ified createdAt date
          return '10/20/2014';
        }
      }
    },

    initialize: function () {
      if (this.computed) this.computedFields = new ComputedFields(this);
    }
  };

  return ServiceMixin;
});
