'use strict';

// TODO: Propogate destroy to children:
//   - AppTokens
//   - Services
//   - ServiceTokens
// http://stackoverflow.com/a/14349259/957813
module.exports = function (app, mongoose) {
  var appSchema = new mongoose.Schema({
    name: String,
    clientId: { type: String, unique: true },
    clientSecret: { type: String },
    owner: String
  });

  appSchema.index({ clientId: 1 }, { unique: true });
  appSchema.index({ owner: 1 });

  appSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('App', appSchema);
};
