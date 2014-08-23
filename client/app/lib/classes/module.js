define(function (require) {
  var Marionette = require('marionette');
  var Radio = require('backbone.radio');

  /*
   * Module is a lightweight class that implements:
   *   - start/stop methods
   *   - a routes hash
   *   - ownership of a region passed via start() or new()
   * TODO: unregister routes for module that is stopped?
   */
  var Module = Marionette.Object.extend({

    channelName: null,
    channel: null,
    isRunning: null,
    region: null,
    _router: null,
    _presenters: null,
    _repliers: null,
    _compliers: null,

    constructor: function (options) {
      _.extend(this, _.pick(options || {}, 'region', 'channelName'));

      this._constructRoutes(this.routes || {});

      Module.__super__.constructor.apply(this, arguments);
    },

    _attachChannel: function (channelName) {
      this._repliers = [];
      this._compliers = [];
      this.channel = Radio.channel(channelName);
    },

    _constructRoutes: function (routes) {
      this._router = new (Marionette.AppRouter.extend({
        appRoutes: routes,
        controller: this
      }))();
    },

    _constructPresenters: function (presenters) {
      this._presenters = _.chain(presenters)
        .pairs()
        .map(function (pair) {
          var name = pair[0];
          var PresenterClass = pair[1];
          return [name, new PresenterClass({ channelName: this.channelName })];
        }, this)
        .reduce(function (presentersObj, pair) {
          var name = pair[0];
          var presenter = pair[1];
          presentersObj[name] = presenter;
          return presentersObj;
        }, {})
        .value();
    },

    _destructPresenters: function (presenters) {
      this._presenters = _.map(presenters, _.bind(function (value, key, list) {
        value.destroy();
        return null;
      }), this);
    },

    _detachChannel: function (channel) {
      _.each(this._compliers, function (complier) {
        var channel = complier[0];
        var command = complier[1];
        channel.stopComplying(command);
      });
      _.each(this._repliers, function (replier) {
        var channel = replier[0];
        var request = replier[1];
        channel.stopReplying(request);
      });
    },

    complyWith: function (channel, command, complier) {
      channel.comply(command, complier);
      this._compliers.push([channel, command]);
    },

    replyWith: function (channel, request, replier) {
      channel.reply(request, replier);
      this._repliers.push([channel, request]);
    },

    getPresenter: function (presenter) {
      return this._presenters[presenter];
    },

    start: function (options) {
      this.triggerMethod('before:start', options);
      this._attachChannel(this.channelName);
      this._constructPresenters(this.presenters || {});
      this.isRunning = true;
      this.triggerMethod('start', options);
    },

    stop: function (options) {
      this.triggerMethod('before:stop', options);
      this._destructPresenters(this.presenters || {});
      this._detachChannel(this.channel);
      this.isRunning = false;
      this.triggerMethod('stop', options);
    }
  });

  return Module;
});
