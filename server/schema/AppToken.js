'use strict';

module.exports = function (app, mongoose) {
  var appTokenSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    app: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    token: { type: String }
  });

  appTokenSchema.index({ owner: 1 });
  appTokenSchema.index({ clientId: 1 });
  appTokenSchema.index({ token: 1 });

  appTokenSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('AppToken', appTokenSchema);
};
