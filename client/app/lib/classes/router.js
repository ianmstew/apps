define(function (require) {
  var Marionette = require('marionette');

  /*
   * Router that permits enabling and disabling of route handlers.
   */
  var Router = Marionette.Object.extend({

    routes: null,
    controller: null,
    _router: null,

    constructor: function (options) {
      Router.__super__.constructor.apply(this, arguments);
      _.extend(this, _.pick(options, 'routes', 'controller'));
      // We need a parsitic flag on the controller to support logic within route wrappers
      this.controller._routingDisabled = true;
      this._wrapRouting();
      this._constructRoutes();
    },

    _constructRoutes: function () {
      this._router = new (Marionette.AppRouter.extend({
        appRoutes: this.routes,
        controller: this.controller
      }))();
    },

    _wrapRouting: function () {
      _.each(this.routes, this._wrapRoute, this);
    },

    _wrapRoute: function (handlerName) {
      var handler = this.controller[handlerName];
      var wrappedHandler = _.wrap(handler, _.bind(this._routeWrapper, this.controller));
      this.controller[handlerName] = wrappedHandler;
    },

    _routeWrapper: function (routeHandler) {
      var origArgs = Array.prototype.slice.call(arguments, 1);
      // 'this' context is the controller object
      if (!this._routingDisabled) {
        return routeHandler.apply(this, origArgs);
      }
    },

    enable: function () {
      this.controller._routingDisabled = false;
    },

    disable: function () {
      this.controller._routingDisabled = true;
    }
  });

  return Router;
});
