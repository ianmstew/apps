define(function (require) {

  var HasPresenters = {

    presenters: null,
    _presenters: null,

    _initialize: function (options) {
      var skipInitialize = (options || {}).skipInitialize;
      if (this.presenters && !skipInitialize) this.constructPresenters();
      if (this.presenters) this.on('destroy', _.bind(this.destructPresenters, this));
    },

    constructPresenters: function (presenters) {
      this._presenters = {};
      _.each(this.presenters, function (Presenter, name) {
        this._presenters[name] = new Presenter({
          channelName: this.channelName,
          region: this.region
        });
      }, this);
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
    },

    mixinto: function (target) {
      _.defaults(target, _.omit(this, '_initialize', 'mixinto'));
      this._initialize.call(target, target.options);
    }
  };

  return HasPresenters;
});
