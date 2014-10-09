'use strict';

module.exports = function (app, mongoose) {
  var serviceSchema = new mongoose.Schema({
    app: String,
    type: String,
    connectionData: Object
  });

  serviceSchema.index({ app: 1 });
  serviceSchema.index({ owner: 1 });

  serviceSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Service', serviceSchema);
};
