var _ = require('lodash');
var validIdReg = new RegExp("^[0-9a-fA-F]{24}$");

var validator = {
  missing: function (obj, required) {
    var missing;

    // Ensure required is an array
    if (!_.isArray(required)) required = [required];

    if (!_.isObject(obj)) {
      // If obj isn't an object, than it can't contain any properties; thus, all required are
      // missing.
      missing = _.clone(required);
    } else {
      missing = _.difference(required, _.keys(obj));
    }

    return missing;
  },

  validId: function (id) {
    return validIdReg.test(id);
  },

  failOnMissing: function (res, obj, required) {
    var missing = this.missing(obj, required);

    if (missing.length) {
      this.failParam(res, 'Required field(s) are missing: ' + missing.join(', '));
      return true;
    } else {
      return false;
    }
  },

  failServer: function (res, error) {
    var errorMsg = (error && error.toString()) || 'Internal Server Error';
    console.error(error.stack, '\n    [500 error stack trace]');
    res.status(500).json({ error: errorMsg });
  },

  failParam: function (res, error) {
    var errorMsg = (error && error.toString()) || 'Bad Request';
    console.warn(error.stack, '\n    [400 error stack trace]');
    res.status(400).json({ error: errorMsg });
  },

  failUnauthorized: function (res, error) {
    var errorMsg = (error && error.toString()) || 'Not authorized';
    console.warn(401, error);
    res.status(401).json({ error: errorMsg });
  },

  failNotFound: function (res, error) {
    var errorMsg = (error && error.toString()) || 'Not Found';
    console.warn(404, error);
    res.status(404).json({ error: errorMsg });
  }
};

module.exports = validator;
