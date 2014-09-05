define(function (require) {
  var Module = require('lib/classes/module');
  var LoadingPresenter = require('modules/loading/loading.presenter');

  var LoadingModule = Module.extend({

    channelName: 'loading',

    presenters: {
      'loading': LoadingPresenter
    },

    channelEvents: {
      'show:loading': ['comply', 'showLoading']
    },

    showLoading: function (view, options) {
      var opts = _.extend({}, options, { view: view });
      this.getPresenter('loading').present(opts);
    }
  });

  return LoadingModule;
});
