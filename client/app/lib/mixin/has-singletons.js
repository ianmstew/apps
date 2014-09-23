define(function (require) {
  var Radio = require('backbone.radio');

  var HasSingletons = {

    _presenterSingletons: null,
    _viewSingletons: null,
    _entitySingletons: null,

    presenterFor: function (PresenterType, options) {
      var presenter;
      if (!this._presenterSingletons) this._presenterSingletons = {};

      presenter = this._presenterSingletons[PresenterType];

      if (!presenter || presenter.isDestroyed) {
        presenter = new PresenterType(options);
        this._presenterSingletons[PresenterType] = presenter;
      }

      // Presenters are destroyed automatically when their primary view is removed

      return presenter;
    },

    viewFor: function (ViewType, options) {
      var view;
      if (!this._viewSingletons) this._viewSingletons = {};

      view = this._viewSingletons[ViewType];

      if (!view || view.isDestroyed) {
        this._viewSingletons[ViewType] = view = new ViewType(options);
      } else if ((options || {}).state && view.setState) {
        // If view exists, reset original state
        view.setState(options.state);
      }

      // View are destroyed automatically when they are removed from their region

      return view;
    },

    entityFor: function (EntityType, options) {
      var entity;
      if (!this._entitySingletons) this._entitySingletons = {};

      entity = this._entitySingletons[EntityType];

      if (!entity || entity.isDestroyed) {
        this._entitySingletons[EntityType] = entity = new EntityType(options);
        this.listenTo(entity, 'error', this._entityError);
      }

      this.on('destroy', function () {
        _.each(this._entitySingletons, function (entity, key, entities) {
          entity.destroy();
          entities[key] = null;
        });
        this._entitySingletons = null;
      });

      return entity;
    },

    _entityError: function (model, resp, options) {
      Radio.channel('notification').trigger('entity:error', model, resp.statusText);
    }
  };

  return HasSingletons;
});
