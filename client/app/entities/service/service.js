define(function (require) {
  var Backbone = require('backbone');

  var monthNames = new Array(
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  );

  // This is the "Base Service" that sets shared properties on any specific service
  var Service = Backbone.Model.extend({

    urlRoot: function () {
      return '/api/apps/'
        + (this.collection && this.collection.getAppId() || this.get('appId'))
        + '/services/';
    },

    idAttribute: '_id',

    defaults: {
      _id:            undefined,
      app:            undefined, // Owning app id
      type:           undefined, // Keyable service type; e.g., 'facebook' or 'twitter'
                                 // NOTE: Don't attempt to update this; prefer to re-create,
                                 //   due to its usage in Services polymorphic model function.

      // Read only
      connectionData: undefined,
      createdAt:      undefined, // TODO: Not yet implemented on server
      owner:          undefined,

      // View only
      iconClass:      undefined,
      name:           undefined,
      dateAdded:      undefined
    },

    initialize: function () {
      this.on({
        'change:createdAt': this.onChangeCreatedAt.bind(this),
        'change': this.onChange.bind(this)
      });
    },

    // TODO: Changing type will break view bindings; is there a way to avoid that, or re-bind
    //   using a new model?
    onChange: function (service) {
      // Maintain proper polymorphic model type in parent collection
      if (this.changed.type) {
        this.collection.remove(this);
        this.collection.add(_.clone(this.attributes));
      }
    },

    onChangeCreatedAt: function (service, createdAt) {
      var dateFormatted = 'N/A';

      if (createdAt) {
        var dateTime = new Date(Date.parse(createdAt)),
          month = monthNames[dateTime.getMonth()],
          day = dateTime.getDate(),
          year = dateTime.getFullYear();
        dateFormatted = month + ' ' + day + ', ' + year;
      }

      this.set('dateAdded', dateFormatted);
    },

    toJSON: function () {
      var attrs = Service.__super__.toJSON.apply(this, arguments);
      return _.omit(attrs, 'iconClass', 'name', 'dateAdded');
    }
  });

  return Service;
});
