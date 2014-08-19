define(function (require) {
  var Backbone = require('backbone');

  var OptionsModel = Backbone.Model.extend({

    defaults:
      { name: 'Overview' },
      { name: 'Remote Services' },
      { name: 'Settings' }
  });

  return OptionsModel;
});
