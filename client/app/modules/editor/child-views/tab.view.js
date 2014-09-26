define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/child-views/tab.view');
  var HasState = require('lib/mixin/has-state');
  var HasChannel = require('lib/mixin/has-channel');

  var TabView = Marionette.ItemView.extend({

    mixins: [HasState, HasChannel],

    channelName: 'editor',

    template: template,
    tagName: 'li',

    channelEvents: {
      'show:tab': ['on', 'tabShown']
    },

    stateEvents: {
      'change': 'render'
    },

    tabShown: function (tab) {
      var selected = this.model.get('name') === tab;
      this.state.set('selected', selected);
    },

    serializeData: function () {
      var data = TabView.__super__.serializeData.apply(this, arguments);
      data.appID = this.channel.request('appId');
      return data;
    }
  });

  return TabView;
});
