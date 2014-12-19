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

    originalType: undefined,

    constructor: function () {
      this.on({
        'change:createdAt': this.onChangeCreatedAt,
        'change:type': this.onChangeType,
        'change:clientId': this.onChangeClientId
      }, this);
      Service.__super__.constructor.apply(this, arguments);
    },

    onChangeClientId: function () {
      //debugger;
    },

    validate: function (attrs, options) {
      if (!_.isUndefined(this.originalType) && attrs.type !== this.originalType) {
        return "Can't change a service type; please remove and create a new one.";
      }
    },

    onChangeType: function (service, type) {
      if (_.isUndefined(this.previous('type'))) {
        this.originalType = this.get('type');
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
