'use strict';

// TODO: Research Mongoose migrations
// TODO: Propagate destroy to children (http://stackoverflow.com/a/14349259/957813)
//   - AppTokens
//   - Services
//   - ServiceTokens
// TODO: Use populate() to add services? What happens on save? on destroy?
// TODO: Add 'createdAt' (http://stackoverflow.com/a/12670523/957813)
module.exports = function (app, mongoose) {
  var appSchema = new mongoose.Schema({
    clientId: { type: String, unique: true },
    clientSecret: { type: String },
    description: String,
    logo: String,
    name: String,
    owner: String
  });

  appSchema.index({ clientId: 1 }, { unique: true });
  appSchema.index({ owner: 1 });

  appSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('App', appSchema);
};
