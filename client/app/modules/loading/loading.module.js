define(function (require) {
  var Module = require('lib/classes/module');
  var LoadingPresenter = require('modules/loading/loading.presenter');

  var LoadingModule = Module.extend({

    channelName: 'loading',

    channelEvents: {
      'show:loading': ['comply', 'showLoading']
    },

    showLoading: function (view, region, options) {
      new LoadingPresenter({
        region: region,
        view: view,
        LoadingView: (options || {}).LoadingView,
        present: true
      });
    }
  });

  return LoadingModule;
});
