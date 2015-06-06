var dataController = require('../controllers/data-controller');

var dataRoutes = function (app) {

  app.get(/\/data\/(twitter|facebook)\/(.+)/, dataController.defaultQuery);
};

module.exports = dataRoutes;
