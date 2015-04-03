'use strict';

// TODO: AppToken should expire (delete itself) one month from creation, along with its child
//   ServiceTokens.
module.exports = function (app, mongoose) {
  var appTokenSchema = new mongoose.Schema({
    app: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    token: { type: String },
    createdAt: { type: Date, default: Date.now }
  });

  appTokenSchema.index({ app: 1 });
  appTokenSchema.index({ token: 1 });

  appTokenSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('AppToken', appTokenSchema);
};
