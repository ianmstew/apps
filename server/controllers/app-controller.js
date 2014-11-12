var validator = require('../util/validator');
var uuid = require('node-uuid');
var _ = require('lodash');

// TODO! Implement logo uploader
var appController = {

  list: function (req, res) {
    req.app.db.models.App
      .find({
        owner: req.user._id
      })
      .execQ()
      .then(function (apps) {
        res.json(apps);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  find: function (req, res) {
    req.app.db.models.App
      .find({
        _id: req.params.id,
        owner: req.user._id
      })
      .execQ()
      .then(function (app) {
        res.json(app);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  create: function (req, res) {
    var _app = _.extend({
      clientId: uuid.v4(),
      clientSecret: uuid.v4(),
      owner: req.user._id
    }, _.pick(req.body, [
      'description',
      'name',
      'logo'
    ]));

    req.app.db.models.App
      .createQ(_app)
      .then(function (app) {
        res.json(app);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  update: function (req, res) {
    // Update attributes whitelist
    var _app = _.extend({}, _.pick(req.body, [
      'description',
      'name',
      'logo'
    ]));

    req.app.db.models.Service
      .updateQ({
        _id: req.params.id,
        owner: req.user._id
      }, _app)
      .then(function (count) {
        if (count === 0) {
          validator.failNotFound(res);
        } else {
          res.json(_app);
        }
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  destroy: function (req, res) {
    req.app.db.models.App
      .remove({
        _id: req.params.id,
        owner: req.user._id
      })
      .execQ()
      .then(function (count) {
        if (count === 0) {
          validator.failNotFound(res);
        } else {
          res.send(200);
        }
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  }
};

module.exports = appController;
