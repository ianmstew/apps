'use strict';

module.exports = function (app, mongoose) {
  var appTokenSchema = new mongoose.Schema({
    owner: String,
    clientId: { type: String, unique: true },
    token: { type: String }
  });

  appTokenSchema.index({ owner: 1 });
  appTokenSchema.index({ clientId: 1 });
  appTokenSchema.index({ token: 1 });

  appTokenSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('AppToken', appTokenSchema);
};