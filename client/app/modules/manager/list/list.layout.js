define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/list.layout');
  var ListPresenter = require('modules/manager/list/list.presenter');

  var ListLayoutView = Marionette.LayoutView.extend({

    template: template,
    className: 'content-wrap',

    regions: {
      list: '.js-apps-list'
    },

    // The list layout contains some basic wrapper HTML.
    // Once it's shown, then pass control of the 'list' region to the List presenter.
    onBeforeShow: function () {
      new ListPresenter({
        region: this.getRegion('list'),
        present: true
      });
    }
  });

  return ListLayoutView;
});
