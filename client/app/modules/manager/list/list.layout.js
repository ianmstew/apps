define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/manager/list/list.layout');
  var ListPresenter = require('modules/manager/list/list.presenter');

  var ListView = Marionette.LayoutView.extend({

    template: template,
    className: 'content-wrap',

    regions: {
      list: '.js-apps-list'
    },

    onShow: function () {
      var listPresenter = new ListPresenter({
        region: this.getRegion('list')
      });
      listPresenter.present();
    }
  });

  return ListView;
});
