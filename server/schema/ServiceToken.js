'use strict';

module.exports = function (app, mongoose) {
  var serviceTokenSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    appToken: { type: String },
    tokenSet: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
  });

  serviceTokenSchema.index({ appToken: 1 });

  serviceTokenSchema.set('autoIndex', app.get('env') === 'development');
  app.db.model('ServiceToken', serviceTokenSchema);
};
