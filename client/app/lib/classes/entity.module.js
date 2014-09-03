define(function (require) {
  var Marionette = require('marionette');
  var Radio = require('backbone.radio');
  var Module = require('lib/classes/module');

  var EntityModule = Module.extend({

    entities: null,
    _entities: null,

    constructor: function () {
      if (this.entities) {
        this._entities = {};
        this._constructEntities();
        this.on('destroy', this._destructEntities);
      }
      EntityModule.__super__.constructor.apply(this, arguments);
    },

    _constructEntities: function () {
      this._entities = _.chain(this.entities)
        .map(this._constructEntity, this)
        .object()
        .value();
    },

    _constructEntity: function (Entity, name) {
      var entity;
      var modelEventsKey;

      if (_.isArray(Entity)) {
        modelEventsKey = Entity[1];
        Entity = Entity[0];
      }

      entity = new Entity();
      if (modelEventsKey) Marionette.bindEntityEvents(this, entity, this[modelEventsKey]);

      return [name, entity];
    },

    _destructEntities: function () {
      this._entities = _.chain(this._entities)
        .map(this._destructEntity, this)
        .object()
        .value();
      this._entities = null;
    },

    _destructEntity: function (entity, name) {
      var modelEventsKey;

      if (_.isArray(this.entities[name])) {
        modelEventsKey = this.entities[name][1];
        Marionette.unbindEntityEvents(this, entity, this[modelEventsKey]);
      }

      entity.destroy();

      return [name, null];
    },

    _modelError: function (model, resp, options) {
      Radio.channel('notification').trigger('entity:error', model, resp.statusText);
    },

    getEntity: function (name) {
      return this._entities[name];
    },

    // Creates a new instance that broadcasts errors on the error channel
    entityFor: function (Entity, attributes, options) {
      var entity = new Entity(attributes, options);
      this.listenTo(entity, 'error', this._modelError);
      return entity;
    }
  });

  return EntityModule;
});
