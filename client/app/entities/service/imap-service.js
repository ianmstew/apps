define(function (require) {
  var Backbone = require('backbone');
  var Cocktail = require('backbone.cocktail');
  var ServiceMixin = require('entities/service/service.mixin');

  var ImapService = Backbone.Model.extend({

    defaults: {
      type: 'imap',

      // Computed
      // TODO: Special IMAP fields inside connectionData
      TODOImapField: null,

      // View only
      iconClass: 'fa-envelope',
      name: 'IMAP'
    },

    computed: {
      TODOImapField: {
        depends: ['connectionData'],
        get: function (fields) {
          return fields.connectionData.TODOImapField;
        },
        set: function (value, fields) {
          fields.connectionData = fields.connectionData || {};
          fields.TODOImapField = value;
        }
      }
    }
  });

  Cocktail.mixin(ImapService, ServiceMixin);

  return ImapService;
});
