define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/child-views/tab.view');
  var HasState = require('lib/mixin/has-state');
  var HasChannel = require('lib/mixin/has-channel');

  var TabView = Marionette.ItemView.extend({

    channelName: 'editor',

    template: template,
    tagName: 'li',

    stateEvents: {
      'change': 'render'
    },

    initialize: function () {
      _.bindAll(this, 'tabShown');
      HasState.augment(this);
      HasChannel.augment(this);
      this.listenTo(this.channel, 'show:tab', this.tabShown);
    },

    tabShown: function (tab) {
      var selected = this.model.get('name') === tab;
      this.state.set('selected', selected);
    }
  });

  return TabView;
});
