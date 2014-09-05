define(function (require) {
  var Mixin = require('lib/classes/mixin');

  /*
   * Manage a set of singleton presenters, passing down the owner's region and channel.
   */
  var HasPresenters = Mixin.extend({

    // Declarative set of presenters
    // presenters: {
    //   'presenterName': PresenterClass
    // },

    // Local storage of presenter instances
    _presenters: null,

    initialize: function () {
      this._presenters = {};
    },

    getPresenter: function (name) {
      var presenter = this._presenters[name];
      var PresenterType;

      if (!presenter || presenter.isDestroyed) {
        PresenterType = this.presenters[name];
        presenter = new PresenterType({
          region: this.region,
          channelName: this.channelName
        });
        this._presenters[name] = presenter;
      }

      return presenter;
    }
  });

  return HasPresenters;
});
