define(function (require) {
  var Backbone = require('backbone');
  var _Util = require('lib/util/underscore-util');

  var setParse = function (set) {
    var origArgs = _Util.origWrapArgs(arguments);
    set.apply(this, this.parse(origArgs));
  };

  Backbone.Model.prototype.set = _.wrap(Backbone.Model.prototype.set, setParse);
});
