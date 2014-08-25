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
      HasState.mixInto(this);
      HasChannel.mixInto(this);
      this.listenTo(this.channel, 'show:tab', this.tabShown);
    },

    tabShown: function (tab) {
      var shouldSelect = this.model.get('name') === tab;
      var isSelected = this.state.get('selected')
      if (shouldSelect !== isSelected) {
        this.state.set('selected', shouldSelect);
      }
    }
  });

  return TabView;
});
