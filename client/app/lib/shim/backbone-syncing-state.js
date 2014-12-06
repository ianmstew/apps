define(function (require) {
  require('lib/shim/promise');
  var Backbone = require('backbone');

  function syncWrapped() {
    return (this.syncing = Backbone.sync.apply(this, arguments));
  }

  // Guarantee a resolved promise
  Backbone.Model.prototype.syncing
    = Backbone.Collection.prototype.syncing
    = Promise.resolve();

  // Override sync method
  Backbone.Model.prototype.sync
    = Backbone.Collection.prototype.sync
    = syncWrapped;
});
