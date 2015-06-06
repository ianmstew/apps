'use strict';

module.exports = function (app, mongoose) {
  var accessTokenSchema = new mongoose.Schema({
    accountId: { type: String },
    token: { type: String },
    app: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    appToken: { type: String },
    createdAt: { type: Date, default: Date.now }
  });

  accessTokenSchema.index({ token: 1 });

  accessTokenSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('AccessToken', accessTokenSchema);
};
