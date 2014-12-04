var validator = require('../util/validator');
var _ = require('lodash');

var userController = {

  find: function (req, res) {
    var userId;

    if (req.params.id === 'current') {
      userId = req.user._id;
    } else {
      userId = req.params.id;
    }

    req.app.db.models.User
      .findById({
        _id: userId
      })
      .populate('roles.admin')
      .populate('roles.account')
      .execQ()
      .then(function (user) {
        if (!user) {
          validator.failNotFound(res);
        } else {
          res.json(_.omit(user.toJSON(), 'password'));
        }
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  }
};

module.exports = userController;
