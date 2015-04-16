'use strict';

module.exports = function (app, mongoose) {
  var accessTokenSchema = new mongoose.Schema({
    app: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    token: { type: String },
    createdAt: { type: Date, default: Date.now }
  });

  accessTokenSchema.index({ app: 1 });
  accessTokenSchema.index({ token: 1 });

  accessTokenSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('AccessToken', accessTokenSchema);
};
