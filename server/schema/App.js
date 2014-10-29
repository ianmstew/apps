'use strict';

module.exports = function (app, mongoose) {
  var appSchema = new mongoose.Schema({
    name: String,
    clientId: { type: String, unique: true },
    clientSecret: { type: String },
    user: String
  });

  appSchema.index({ clientId: 1 }, { unique: true });
  appSchema.index({ user: 1 });

  appSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('App', appSchema);
};
