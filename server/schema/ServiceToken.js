'use strict';

// TODO: Change 'owner' to an arbitrary String (redmine #58)
module.exports = function (app, mongoose) {
  var serviceTokenSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: Number,
    tokenSet: mongoose.Schema.Types.Mixed
  });

  serviceTokenSchema.index({ service: 1 });
  serviceTokenSchema.index({ owner: 1 });

  serviceTokenSchema.set('autoIndex', app.get('env') === 'development');
  app.db.model('ServiceToken', serviceTokenSchema);
};
