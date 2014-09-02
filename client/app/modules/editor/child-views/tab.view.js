define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/child-views/tab.view');
  var HasState = require('lib/mixin/has-state');
  var HasChannel = require('lib/mixin/has-channel');

  var TabView = Marionette.ItemView.extend({

    channelName: 'editor',

    template: template,
    tagName: 'li',

    channelEvents: {
      'show:tab': ['on', 'tabShown']
    },

    stateEvents: {
      'change': 'render'
    },

    initialize: function (options) {
      this.initializeMixins(options);
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

  HasState.mixInto(TabView);
  HasChannel.mixInto(TabView);

  return TabView;
});
