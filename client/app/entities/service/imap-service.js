define(function (require) {
  var Service = require('entities/service/service');

  // TODO: Parse out connectionData specific to IMAP
  var ImapService = Service.extend({

    defaults: {
      type: 'imap',

      // View only
      iconClass: 'fa-envelope',
      name: 'IMAP',
      TODOImapField: undefined
    }
  });

  return ImapService;
});
