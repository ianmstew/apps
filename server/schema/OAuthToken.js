'use strict';

module.exports = function (app, mongoose) {
  var oauthTokenSchema = new mongoose.Schema({
    user: String,
    clientId: { type: String, unique: true },
    token: { type: String }
  });

  oauthTokenSchema.index({ user: 1 });
  oauthTokenSchema.index({ clientId: 1 });
  oauthTokenSchema.index({ token: 1 });

  oauthTokenSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('OAuthToken', oauthTokenSchema);
};
