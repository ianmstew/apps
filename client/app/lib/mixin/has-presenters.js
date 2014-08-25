define(function (require) {

  var HasPresenters = {

    _initialize: function (options) {
      // { initialize: false } will defer intialization
      var initialize = (this.options || {}).initialize !== false;
      if (this.presenters && initialize) this.constructPresenters();
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

    mixInto: function (target, options) {
      _.extend(target, _.omit(this, '_initialize', 'mixInto'));
      this._initialize.call(target, options);
    }
  };

  return HasPresenters;
});
