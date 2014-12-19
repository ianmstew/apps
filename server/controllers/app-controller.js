var validator = require('../util/validator');
var uuid = require('node-uuid');
var _ = require('lodash');

var appController = {

  list: function (req, res) {
    req.app.db.models.App
      .find({
        owner: req.user._id
      })
      .populate('services')
      .execQ()
      .then(function (apps) {
        res.json(apps);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  find: function (req, res) {
    if (!validator.validId(req.params.id)) {
      validator.failNotFound(res);
      return;
    }

    req.app.db.models.App
      .findOne({
        _id: req.params.id,
        owner: req.user._id
      })
      .populate('services')
      .execQ()
      .then(function (app) {
        if (!app) {
          validator.failNotFound(res);
        } else {
          res.json(app);
        }
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
      'oauthCallback'
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
    if (!validator.validId(req.params.id)) {
      validator.failNotFound(res);
      return;
    }

    // Update attributes whitelist
    var _app = _.extend({}, _.pick(req.body, [
      'description',
      'name',
      'oauthCallback'
    ]));

    req.app.db.models.App
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
      .findOneAndRemove({
        _id: req.params.id,
        owner: req.user._id
      })
      .execQ()
      .then(function (app) {
        if (!app) {
          validator.failNotFound(res);
        } else {
          // Workaround to trigger 'remove' hooks
          // https://github.com/learnboost/mongoose/issues/1241#issuecomment-39104584
          app.remove();
          res.json(app);
        }
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  }
};

module.exports = appController;
