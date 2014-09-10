define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/list.view');
  var ListPresenter = require('modules/manager/list/list.presenter');

  var ListView = Marionette.LayoutView.extend({

    template: template,
    className: 'content-wrap',

    regions: {
      list: '.js-apps-list'
    },

    onShow: function () {
      var appsPresenter = new ListPresenter({
        region: this.getRegion('list')
      });
      appsPresenter.present();
    }
  });

  return ListView;
});
