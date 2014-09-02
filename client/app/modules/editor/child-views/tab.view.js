define(function (require) {
  var Marionette = require('marionette');
  var template = require('hgn!modules/editor/child-views/tab.view');
  var HasState = require('lib/mixin/has-state');
  var HasChannel = require('lib/mixin/has-channel');
  var Radio = require('backbone.radio');

  var TabView = Marionette.ItemView.extend({

    channelName: 'editor',

    template: template,
    tagName: 'li',

    stateEvents: {
      'change': 'render',
      'change': 'selected'
    },

    initialize: function () {
      _.bindAll(this, 'tabShown');
      HasState.mixInto(this);
      HasChannel.mixInto(this);
      this.listenTo(this.channel, 'show:tab', this.tabShown);
    },

    tabShown: function (tab) {
      var selected = this.model.get('name') === tab;
      this.state.set('selected', selected);
    },

    serializeData: function () {
      var data = TabView.__super__.serializeData.apply(this, arguments);
      var appID = Radio.channel('editor').request('appID');
      data.appID = appID;
      return data;
    },

    changeSelected: function (model, selected) {
      //
    }
  });

  return TabView;
});
