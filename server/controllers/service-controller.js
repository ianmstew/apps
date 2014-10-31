var _ = require('lodash');
var validator = require('../util/validator');

var serviceController = {

  list: function (req, res) {
    req.app.db.models.Service
      .find({
        app: req.params.app
      })
      .execQ()
      .then(function (connections) {
        res.json(connections);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  find: function (req, res) {
    req.app.db.models.Service
      .find({
        _id: req.params.id,
        owner: req.user._id
      })
      .execQ()
      .then(function (service) {
        res.json(service);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },
  
  create: function (req, res) {
    // Set app based on path param
    var data = _.extend({
      app: req.params.app,
      owner: req.user._id
    }, _.pick(req.body, [
      'type',
      'connectionData'
    ]));

    req.app.db.models.Service
      .createQ(data)
      .then(function (service) {
        return res.json(service);
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  update: function (req, res) {
    // Do not allow changing of app
    var data = _.extend({}, _.pick(req.body, [
      'type',
      'connectionData'
    ]));

    req.app.db.models.Service
      .update({
        _id: req.params.id,
        app: req.params.app,
        owner: req.user._id
      }, data)
      .execQ()
      .then(function (count) {
        if (count === 0) {
          validator.failNotFound(res);
        } else {
          res.json(data);
        }
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  },

  destroy: function (req, res) {
    req.app.db.models.Service
      .remove({
        _id: req.params.id,
        app: req.params.app,
        owner: req.user._id
      })
      .execQ()
      .then(function (count) {
        if (count === 0) {
          validator.failNotFound(res);
        } else {
          res.json(200);
        }
      })
      .catch(validator.failServer.bind(null, res))
      .done();
  }
};

module.exports = serviceController;
