define(function (require) {
  var Mixin = require('lib/classes/mixin');

  /*
   * Manage a set of presenters, passing down the owner's region and channel.
   *
   * Presenters are constructed at initialize time unless { manualInitialize: true }
   * in passed, in which case constructPresenters() must be called manually.
   * Presenters are always destructed on destroy.
   */
  var HasPresenters = Mixin.extend({

    // Declarative set of presenters
    // presenters: {
    //   'presenterName': PresenterClass
    // },

    // Local storage of presenter instances
    _presenters: null,

    initialize: function (options) {
      _.bindAll(this, 'destructPresenters', '_constructPresenter');
      var manualInitialize = (options || {}).manualInitialize;

      if (this.presenters) {
        if (!manualInitialize) this.constructPresenters();
        this.on('destroy', this.destructPresenters);
      }
    },

    constructPresenters: function (presenters) {
      this.destructPresenters();
      this._presenters = _.chain(this.presenters)
        .map(this._constructPresenter, this)
        .object()
        .value();
    },

    _constructPresenter: function (Presenter, name) {
      return [name, new Presenter({
        region: this.region,
        channelName: this.channelName
      })];
    },

    destructPresenters: function () {
      this._presenters = _.chain(this._presenters)
        .map(this._destructPresenter, this)
        .object()
        .value();
      this._presenters = null;
    },

    _destructPresenter: function (presenter, name) {
      presenter.destroy();
      return [name, null];
    },

    getPresenter: function (presenter) {
      return this._presenters[presenter];
    }
  });

  return HasPresenters;
});
