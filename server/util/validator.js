var _ = require('lodash');

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
    res.send(500, errorMsg);
  },

  failParam: function (res, error) {
    var errorMsg = (error && error.toString()) || 'Bad Request';
    console.warn(error.stack, '\n    [400 error stack trace]');
    res.send(400, errorMsg);
  },

  failUnauthorized: function (res, error) {
    var errorMsg = (error && error.toString()) || 'Not authorized';
    console.warn(401, error);
    res.send(401, errorMsg);
  },

  failNotFound: function (res, error) {
    var errorMsg = (error && error.toString()) || 'Not Found';
    console.warn(404, error);
    res.send(404, errorMsg);
  }
};

module.exports = validator;
