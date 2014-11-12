define(function (require) {
  var Backbone = require('backbone');
  var TabModel = require('modules/editor/entities/tab');

  var TabsCollection = Backbone.Collection.extend({

    model: TabModel
  });

  return TabsCollection;
});
