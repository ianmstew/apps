var _ = require('lodash');
var validator = require('../util/validator');

var serviceController = {

  list: function (req, res) {
    if (validator.failOnMissing(req.body, ['app'], res)) return;

    req.app.db.models.Service
      .find({
        app: req.body.app
      })
      .exec()
    .then(function (connections) {
      res.json(connections);
    })
    .then(null, validator.failServer.bind(null, res));
  },

  connect: function (req, res) {
    if (validator.failOnMissing(req.body, ['app', 'type'], res)) return;

    var body = req.body;
    var data = {
      app: body.app,
      type: body.type
    };

    if (body.connectionData) {
      data.connectionData = body.connectionData;
    }

    req.app.db.models.Service
      .create(data)
    .then(function (newApiConnection) {
      return res.json(newApiConnection);
    })
    .then(null, validator.failServer.bind(null, res));
  },

  update: function (req, res) {
    if (validator.failOnMissing(req.body, ['app', 'type', '_id'], res)) return;

    var _id = req.body._id;
    var data = _.extend({}, _.pick(req.body, ['app', 'type', 'connectionData']));

    req.app.db.models.Service
      .update({ _id: _id }, data)
      .exec()
    .then(function (count) {
      if (count === 0) {
        validator.failNotFound(res);
      } else {
        if (count > 1) console.warn('Removed ' + count + ', expected 1');
        res.json(data);
      }
    })
    .then(null, validator.failServer.bind(null, res));
  },

  disconnect: function (req, res) {
    if (validator.failOnMissing(req.body, ['_id'], res)) return;

    req.app.db.models.Service
      .remove({
        owner: req.user._id,
        _id: req.body._id
      })
      .exec()
    .then(function (count) {
      if (count === 0) {
        validator.failNotFound(res);
      } else {
        if (count > 1) console.warn('Removed ' + count + ', expected 1');
        res.json(200);
      }
    })
    .then(null, validator.failServer.bind(null, res));
  }
};

module.exports = serviceController;
