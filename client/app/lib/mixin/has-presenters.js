define(function (require) {
  var Mixin = require('lib/classes/mixin');

  /*
   * Manage a set of presenters, passing down the owner's region and channel.
   */
  var HasPresenters = Mixin.extend({

    presenters: null,
    _presenters: null,

    initialize: function (options) {
      _.bindAll(this, 'destructPresenters', '_constructPresenter');

      var skipInitialize = (options || {}).skipInitialize;

      if (this.presenters && !skipInitialize) this.constructPresenters();
      if (this.presenters) this.on('destroy', this.destructPresenters);
    },

    constructPresenters: function (presenters) {
      this.destructPresenters();
      this._presenters = {};
      _.each(this.presenters, this._constructPresenter);
    },

    _constructPresenter: function (Presenter, name) {
      this._presenters[name] = new Presenter({
        region: this.region,
        channelName: this.channelName
      });
    },

    destructPresenters: function () {
      _.each(this._presenters, function (presenter, name) {
        presenter.destroy();
        this._presenters[name] = null;
      }, this);
      this._presenters = null;
    },

    getPresenter: function (presenter) {
      return this._presenters[presenter];
    }
  });

  return HasPresenters;
});
