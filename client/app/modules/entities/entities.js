define(function (require) {
  var Marionette = require('marionette'),
      channels = require('channels');

  var Entities = Marionette.Object.extend({

    initialize: function () {
      _.bindAll(this, 'fetchApps');

      channels.entities.comply('fetch:apps', this.fetchApps);
    },

    fetchApps: function () {
      var apps = [{
        name: 'one'
      }, {
        name: 'two'
      }];

      channels.entities.trigger('fetched:apps', apps);
    }
  });

  return new Entities();
});
