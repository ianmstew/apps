define(function (require) {
  var Marionette = require('marionette');
  var HasChannel = require('lib/mixin/has-channel');
  var HasRegion = require('lib/mixin/has-region');
  var HasPresenter = require('lib/mixin/has-presenters');

  /*
   * Presenter is a lightweight class that contains a Radio channel
   */
  var Presenter = Marionette.Object.extend({

    constructor: function (options) {
      Presenter.__super__.constructor.apply(this, arguments);
      HasChannel.mixInto(this);
      HasRegion.mixInto(this);
      HasPresenter.mixInto(this);
    }
  });

  return Presenter;
});
