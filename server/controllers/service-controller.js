var validator = require('../util/validator');

var serviceController = {

  connect: function (req, res) {
    if (validator.failMissing(req.body, ['app', 'type'], res)) return;

    var body = req.body;
    var user = req.user;
    var data = {
      app: body.app,
      owner: user._id,
      type: body.type
    };

    if (body.connectionData) {
      data.connectionData = body.connectionData;
    }

    req.app.db.models.ApiConnection
      .create(data)
      .then(function (newApiConnection) {
        return res.json(newApiConnection);
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  },

  update: function (req, res) {
    if (validator.failMissing(req.body, ['app', 'type', '_id'], res)) return;

    var body = req.body;
    var user = req.user;
    var data = {
      _id: body._id,
      app: body.app,
      owner: user._id,
      type: body.type
    };

    if (body.connectionData) {
      data.connectionData = body.connectionData;
    }

    req.app.db.models.ApiConnection
      .update({
        _id: data._id,
        owner: data.owner
      }, data)
      .exec()
      .then(function (numberAffected) {
        if (numberAffected === 1) {
          res.json(data);
        }
        else {
          res.json(404);
        }
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  },

  list: function (req, res) {
    if (validator.failMissing(req.query, ['id'], res)) return;

    var user = req.user;
    var query = req.quer;

    req.app.db.models.ApiConnection
      .find({
        owner: user._id,
        app: query.id
      })
      .exec()
      .then(function (connections) {
        res.json(connections);
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  },

  disconnect: function (req, res) {
    if (validator.failMissing(req.query, ['id'], res)) return;

    req.app.db.models.ApiConnection
      .remove({
        owner: req.user._id,
        _id: req.query.id
      })
      .exec()
      .then(function (product) {
        if (product > 0) {
          res.send(200);
        }
        else {
          res.send(404);
        }
      })
      .then(null, function (error) {
        res.send(500, error.toString());
      });
  }
};

module.exports = serviceController;
