var _ = require('lodash');

function enforceRequired(req, res, required) {
	var hasRequired = _.chain(req.body)
		.pick(required)
		.keys()
		.value()
		.length === required.length;

	if (!hasRequired) {
		res.send(400, "Must include " + required.join(', '));
	}
	return hasRequired;
}

var api = {

	connect: function(req, res) {
		var required = ['app', 'type'];
		if (!enforceRequired(req, res, required)) return;

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

		req.app.db.models.ApiConnection.create(data)
			.then(function (newApiConnection) {
				return res.json(newApiConnection);
			})
			.then(null, function (error) {
				res.send(500, err.toString());
			});
	},

	update: function(req, res) {
		var required = ['app', 'type', '_id'];
		if (!enforceRequired(req, res, required)) return;

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

		req.app.db.models.ApiConnection.update({ 
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

	list: function(req, res) {
		if (req.query.id) {
			req.app.db.models.ApiConnection.find({ 
				owner: req.user._id,
				app: req.query.id
			}, function(error, connections) {
				if (error) {
					res.send(500, error.toString());
				}	else {
					res.json(connections);
				}
			});
		} else {
			res.send(400, "App ID not specified.");
		}
	},

	disconnect: function(req, res) {
		if (req.query.id) {
			req.app.db.models.ApiConnection.remove({
				owner: req.user._id,
				_id: req.query.id
			},
			function(error, product) {
				if (error)
					res.send(500, error.toString());
				else {
					if (product > 0) {
						res.send(200);
					}
					else {
						res.send(404);
					}
				}
			});
		} else {
			res.send(400, "Connection ID not specified");
		}
	}
};

module.exports = exports = api;
