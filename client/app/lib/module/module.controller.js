define(function (require) {
  var Marionette = require('marionette'),
      Wreqr = require('backbone.wreqr'),
      globalCh = require('global.channel'),
      logger = require('lib/util/logger'),
      ModuleController;

  ModuleController = Marionette.Controller.extend({

    localCh: null,
    router: null,
    mainRegion: null,

    constructor: function (options) {
      this.mainRegion = options.mainRegion;

      if (this.routes) {
        this.router = new (Marionette.AppRouter.extend({
          appRoutes: this.routes,
          controller: this
        }))();
      }

      // can be used optionally without a module (only runs on global events)
      if (options.module) {
        this.globalCh = globalCh;
        this.localCh = Wreqr.radio.channel(options.module.moduleName);
        this._initEvents(this.localEvents, this.localCh);
      } else if (this.localEvents) {
        logger.error('To use localEvents, please supply a module instance to options');
      }

      this._initEvents(this.globalEvents, globalCh);

      ModuleController.__super__.constructor.apply(this, arguments);
    },

    _initEvents: function (events, channel) {
      var self = this;
      if (!events) return;

      if (events.vent) {
        events.vent = Marionette.normalizeMethods.call(this, events.vent);
      }
      if (events.commands) {
        events.commands = Marionette.normalizeMethods.call(this, events.commands);
      }
      if (events.reqres){
        events.reqres = Marionette.normalizeMethods.call(this, events.reqres);
      }

      _.each(events.vent, function (handler, name) {
        channel.vent.on(name, _.bind(handler, self));
      });

      _.each(events.commands, function (handler, name) {
        if (channel.commands.getHandler(name)) {
          logger.warn('Commands handler ' + name + ' already set; overwriting!');
        }
        channel.commands.setHandler(name, _.bind(handler, self));
      });

      _.each(events.reqres, function (handler, name) {
        if (channel.reqres.getHandler(name)) {
          logger.warn('Reqres handler ' + name + ' already set; overwriting!');
        }
        return channel.reqres.setHandler(name, _.bind(handler, self));
      });
    },

    _closeEvents: function (events, channel) {
      if (!events) return;

      _.each(events.vent, function (handler, name) {
        channel.vent.off(name, handler);
      });

      _.each(events.commands, function (handler, name) {
        channel.commands.removeHandler(name);
      });

      _.each(events.reqres, function (handler, name) {
        channel.reqres.removeHandler(name);
      });
    },

    onClose: function () {
      this._closeEvents(this.globalEvents);
      this._closeEvents(this.localEvents);
    }
  });

  return ModuleController;
});
