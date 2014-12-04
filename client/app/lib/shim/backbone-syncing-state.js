define(function (require) {
  require('lib/shim/promise');
  var Backbone = require('backbone');

  var syncWrapper = function (sync) {
    var origArgs = _.toArray(arguments).slice(1);
    var syncing = sync.apply(this, origArgs);
    this.syncing = syncing;
    return syncing;
  };

  var syncWrapped = _.wrap(Backbone.sync, syncWrapper);

  Backbone.Model.prototype.sync = Backbone.Collection.prototype.sync = syncWrapped;
});
