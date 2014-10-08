var _ = require('lodash');

var validator = {
  missing: function (obj, required) {
    var missing;

    if (!_.isObject(obj)) {
      missing = _.clone(required);
    } else if (!_.isArray(required)) {
      missing = [];
    } else {
      missing = _.difference(required, _.keys(obj));
    }

    return missing;
  },

  failMissing: function (obj, required, res) {
    var missing = this.missing(obj, required);

    if (missing.length) {
      res.send(400, 'Must include ' + missing.join(', '));
      return true;
    } else {
      return false;
    }
  }
};

module.exports = validator;
