define(function (require) {
  var Backbone = require('backbone');

  var setWrapper = function (set, attrs, options) {
    set.call(this, this.parse.call(this, attrs, options), options);
  };

  Backbone.Model.prototype.set = _.wrap(Backbone.Model.prototype.set, setWrapper);
});
